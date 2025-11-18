import React, { useState, useEffect, useRef } from 'react';

// Componente de Gráfica de Barras Horizontales
export const HorizontalBarChart = ({
    title = "Chart Title",
    data = [
        { label: "Item 1", value: 1000 },
        { label: "Item 2", value: 750 },
        { label: "Item 3", value: 500 },
    ],
    colors = ["#1C64F2", "#16BDCA", "#FDBA8C", "#E74694", "#9061F9", "#10B981"],
    height = 350,
    valueFormatter = (value) => `$${value}`,
    showDownloadButton = true,
    timeRangeLabel = "This month",
    actionLabel = "View Details",
    actionHref = "#",
    onActionClick,
    onDownload,
    onBarClick,
    className = ""
    }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const getChartOptions = (isDark) => {
        const textColor = isDark ? '#9CA3AF' : '#6B7280';
        const gridColor = isDark ? '#374151' : '#E5E7EB';
        
        return {
        series: [{
            name: title,
            data: data.map(item => item.value)
        }],
        chart: {
            type: 'bar',
            height: height,
            toolbar: {
            show: false
            },
            background: 'transparent',
            events: {
            dataPointSelection: (event, chartContext, config) => {
                if (onBarClick) {
                const selectedItem = data[config.dataPointIndex];
                onBarClick(selectedItem, config.dataPointIndex);
                }
            }
            }
        },
        plotOptions: {
            bar: {
            borderRadius: 4,
            horizontal: true,
            distributed: true,
            barHeight: '70%',
            }
        },
        colors: colors,
        dataLabels: {
            enabled: true,
            formatter: function (val) {
            return valueFormatter(val);
            },
            style: {
            colors: ['#fff'],
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            },
            offsetX: 0,
        },
        xaxis: {
            categories: data.map(item => item.label),
            labels: {
            style: {
                colors: textColor,
                fontFamily: 'Inter, sans-serif',
            },
            formatter: function (val) {
                return valueFormatter(val);
            }
            },
            axisBorder: {
            show: false,
            },
            axisTicks: {
            show: false,
            },
        },
        yaxis: {
            labels: {
            style: {
                colors: textColor,
                fontFamily: 'Inter, sans-serif',
            },
            },
        },
        grid: {
            borderColor: gridColor,
            strokeDashArray: 4,
            xaxis: {
            lines: {
                show: true
            }
            },
            yaxis: {
            lines: {
                show: false
            }
            },
            padding: {
            top: 0,
            right: 20,
            bottom: 0,
            left: 10
            }
        },
        tooltip: {
            theme: isDark ? 'dark' : 'light',
            y: {
            formatter: function (val) {
                return valueFormatter(val);
            }
            }
        },
        legend: {
            show: false
        },
        theme: {
            mode: isDark ? 'dark' : 'light',
        },
        };
    };

    useEffect(() => {
        // Detectar modo oscuro inicial
        const checkDarkMode = () => {
            const isDark = localStorage.getItem('theme') === 'dark' ||
                (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
            setIsDarkMode(isDark);
        };
        
        checkDarkMode();

        // Observer para detectar cambios en el modo oscuro
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
            getChartOptions(isDarkMode)
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

    // Actualizar el gráfico cuando cambien los datos o el modo oscuro
    useEffect(() => {
        if (chartInstanceRef.current && window.ApexCharts) {
        try {
            chartInstanceRef.current.updateOptions(getChartOptions(isDarkMode), false, true);
        } catch (error) {
            console.error('Error updating chart:', error);
        }
        }
    }, [data, isDarkMode]);

    const handleDownloadClick = () => {
        if (onDownload) {
        onDownload(data);
        }
    };

    const handleActionClick = (e) => {
        if (onActionClick) {
        e.preventDefault();
        onActionClick();
        }
    };

    return (
        <div className={`w-full rounded-lg shadow-sm p-4 md:p-6 ${className}`}>
        <div className="flex justify-between mb-5">
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

        {/* Bar Chart */}
        <div ref={chartRef}></div>

        <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-5">
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