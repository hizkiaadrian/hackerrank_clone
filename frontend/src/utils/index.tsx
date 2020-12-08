import MathJax from 'react-mathjax';
import React from 'react';

export function validateEmail(email : string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export const useLatex = (input : string) => <MathJax.Node inline formula={input}/>;

export function addDays(date: Date, days: number) {
    let temp = new Date(date);
    temp.setDate(temp.getDate() + days);
    return temp;
};
