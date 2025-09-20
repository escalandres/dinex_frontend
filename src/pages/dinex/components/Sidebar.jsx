// import { useState, useEffect } from "react";
import { LayoutDashboard, Wallet, WalletMinimal, BanknoteArrowUp, PiggyBank, CreditCard, ChartNoAxesCombined } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
export const Sidebar = () => {
    return (
        <div className="element">
            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
            </button>
        
            <div id="default-sidebar" className="top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto">
                <div className="flex justify-start mb-4">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center p-2 rounded-md nav-button"
                    >
                        <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                        </svg>
                    </button>
                </div>
                <ul className="space-y-2 font-medium">
                    <li>
                        <a href="/app/dashboard" className="flex items-center gap-7 p-2 text-gray-900 rounded-lg  group">
                        <span className="flex items-center justify-center w-5 h-5">
                            <LayoutDashboard className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                        </span>
                        <span className="text-l font-medium">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="/app/instruments" className="flex items-center gap-7 p-2 text-gray-900 rounded-lg  group">
                        <span className="flex items-center justify-center w-5 h-5">
                            <Wallet className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                        </span>
                        <span className="text-l font-medium">Instruments</span>
                        </a>
                    </li>
                    <li>
                        <a href="/app/incomes" className="flex items-center gap-7 p-2 text-gray-900 rounded-lg  group">
                        <span className="flex items-center justify-center w-5 h-5">
                            <BanknoteArrowUp className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                        </span>
                        <span className="text-l font-medium">Income</span>
                        </a>
                    </li>
                    <li>
                        <a href="/app/savings" className="flex items-center gap-7 p-2 text-gray-900 rounded-lg  group">
                        <span className="flex items-center justify-center w-5 h-5">
                            <PiggyBank className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                        </span>
                        <span className="text-l font-medium">Savings</span>
                        </a>
                    </li>
                    <li>
                        <a href="/app/gastos" className="flex items-center gap-7 p-2 text-gray-900 rounded-lg  group">
                        <span className="flex items-center justify-center w-5 h-5">
                            <CreditCard className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                        </span>
                        <span className="text-l font-medium">Expenses</span>
                        </a>
                    </li>
                    <li>
                        <a href="/app/inversiones"
                            className="flex items-center gap-7 p-2 text-gray-900 rounded-lg  group"
                            >
                            <span className="flex items-center justify-center w-5 h-5">
                                <ChartNoAxesCombined className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            </span>
                            <span className="text-l font-medium">Investments</span>
                            </a>
                    </li>
                </ul>
                <hr className="flex-1 mt-8 border-gray-300 dark:border-gray-600" />
                <ThemeToggle />
            </div>
            </div>
        </div>
    );
};