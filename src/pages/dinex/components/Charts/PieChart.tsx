import React, { useState, useEffect, useRef } from 'react';

// Agregar este componente junto a DonutChart y HorizontalBarChart
export const PieChart = ({
    title = "Chart Title",
    series = [35.1, 23.5, 2.4, 5.4],
    labels = ["Label 1", "Label 2", "Label 3", "Label 4"],
    colors = ["#1C64F2", "#16BDCA", "#FDBA8C", "#E74694"],
    height = 320,
    showPercentage = true,
    showDownloadButton = true,
    timeRangeLabel = "Last 7 days",
    actionLabel = "View Details",
    actionHref = "#",
    onActionClick,
    onDownload,
    className = ""
    }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const getChartOptions = (seriesData, isDark) => {
        const textColor = isDark ? '#9CA3AF' : '#6B7280';
        
        return {
        series: seriesData,
        colors: colors,
        chart: {
            height: height,
            width: "100%",
            type: "pie",
            background: 'transparent',
        },
        stroke: {
            colors: isDark ? ['#1F2937'] : ['#fff'],
            width: 2,
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
            return showPercentage ? val.toFixed(1) + '%' : '';
            },
            style: {
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            colors: ['#fff']
            },
            dropShadow: {
            enabled: false
            }
        },
        labels: labels,
        legend: {
            position: "bottom",
            fontFamily: "Inter, sans-serif",
            labels: {
            colors: textColor,
            },
            markers: {
            width: 12,
            height: 12,
            radius: 12,
            },
        },
        tooltip: {
            theme: isDark ? 'dark' : 'light',
            y: {
            formatter: function (val) {
                return val.toFixed(2) + '%';
            }
            }
        },
        theme: {
            mode: isDark ? 'dark' : 'light',
        },
        };
    };

    useEffect(() => {
        const checkDarkMode = () => {
            const isDark = localStorage.getItem('theme') === 'dark' ||
                (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
            setIsDarkMode(isDark);
        };
        
        checkDarkMode();

        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
        });

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/apexcharts/3.44.0/apexcharts.min.js';
        script.async = true;
        
        script.onload = () => {
        if (chartRef.current && window.ApexCharts) {
            chartInstanceRef.current = new window.ApexCharts(
            chartRef.current,
            getChartOptions(series, isDarkMode)
            );
            chartInstanceRef.current.render();
        }
        };

        document.body.appendChild(script);

        return () => {
        observer.disconnect();
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }
        if (document.body.contains(script)) {
            document.body.removeChild(script);
        }
        };
    }, []);

    useEffect(() => {
        if (chartInstanceRef.current && window.ApexCharts) {
        try {
            chartInstanceRef.current.updateOptions(getChartOptions(series, isDarkMode), false, true);
        } catch (error) {
            console.error('Error updating chart:', error);
        }
        }
    }, [series, labels, colors, isDarkMode]);

    const handleDownloadClick = () => {
        if (onDownload) {
        onDownload();
        }
    };

    const handleActionClick = (e) => {
        if (onActionClick) {
        e.preventDefault();
        onActionClick();
        }
    };

    return (
        <div className={`max-w-sm w-full rounded-lg shadow-sm p-4 md:p-6 ${className}`}>
        <div className="flex justify-between mb-3">
            <div className="flex justify-center items-center">
            <h5 className="text-xl font-bold leading-none pe-1">
                {title}
            </h5>
            <svg
                className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z" />
            </svg>
            </div>
            {showDownloadButton && (
            <div>
                <button
                type="button"
                onClick={handleDownloadClick}
                className="hidden sm:inline-flex items-center justify-center text-gray-500 w-8 h-8 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm"
                >
                <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 18"
                >
                    <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
                    />
                </svg>
                <span className="sr-only">Download data</span>
                </button>
            </div>
            )}
        </div>

        {/* Pie Chart */}
        <div className="py-6" ref={chartRef}></div>

        <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
            <div className="flex justify-between items-center pt-5">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {timeRangeLabel}
            </span>
            <a
                href={actionHref}
                onClick={handleActionClick}
                className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2"
            >
                {actionLabel}
                <svg
                className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
                >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                />
                </svg>
            </a>
            </div>
        </div>
        </div>
    );
};