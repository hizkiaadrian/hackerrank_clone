// @ts-nocheck

import React from 'react'
import {Candidate} from '../shared.interface';
import {useTable, usePagination} from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDownload} from '@fortawesome/free-solid-svg-icons';

import Links from '../../../configs/api-links.json';

function CandidatesList({candidates} : {candidates: Candidate[]}) {
    const data = React.useMemo(() => candidates, [candidates]);
    
    const columns = React.useMemo(
        () => [
            {Header: "Name", accessor: "name"},
            {Header: "Email", accessor: "email"},
            {Header: "Assessment started", accessor: "assessmentStarted"},
            {Header: "Submission time", accessor: "submissionTime"}
        ], []);

    const downloadSubmission = async (filePath: string) => {
        const response = await fetch(
            `${Links.download_submission}?filePath=${filePath}`, 
            {
                method: 'GET', 
                headers:{"Authorization": localStorage.getItem("token") ?? ""}
            });
        const blob = await response.blob();
        const link = document.createElement('a');
        link.setAttribute('href', window.URL.createObjectURL(blob));
        link.setAttribute('download', filePath);
        link.click();
    }
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize }
    } = useTable({ columns, data, initialState: {pageIndex: 0, pageSize: 5} }, usePagination);

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => <th {...column.getHeaderProps()}>{column.render('Header')}</th>)}
                            <th>Submission</th>
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row)
                        return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => <td {...cell.getCellProps()}>{cell.render('Cell').props.value ?? "-"}</td>)}
                            <td>
                                {row.original.submission &&
                                    <span onClick={() => downloadSubmission(row.original.submission)} style={{cursor:"pointer"}}>
                                        <FontAwesomeIcon icon={faDownload}/>
                                    </span>
                                }
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
            <div>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>{'<'}</button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>{'>'}</button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>{' '}
                <span>Page{' '}<strong>{pageIndex + 1} of {pageOptions.length}</strong>{' '}</span>
                <select value={pageSize} onChange={e => {setPageSize(Number(e.target.value))}}>
                    {[5, 10, 20].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
} 

export default CandidatesList;
