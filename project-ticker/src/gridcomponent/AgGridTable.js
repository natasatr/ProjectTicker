import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';



const AgGridTable = () => {

    const [load, setLoad] = useState(true);
    const [rowData, setRowData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get('https://data.binance.com/api/v3/ticker/24hr');
                const data = response.data.map(item => ({
                    ...item,
                    //transformacija za vrijeme
                    openTime: new Date(item.openTime).toLocaleDateString('en-GB'),
                    closeTime: new Date(item.closeTime).toLocaleDateString('en-GB'),
                    //dva mjesta iza zareza
                    lastPrice: parseFloat(item.lastPrice).toFixed(2),
                    priceChange: parseFloat(item.priceChange).toFixed(2),
                    priceChangePercent: parseFloat(item.priceChangePercent).toFixed(2),
                    highPrice: parseFloat(item.highPrice).toFixed(2),
                    lowPrice: parseFloat(item.lowPrice).toFixed(2)
                  }));
                  setRowData(data);
                  setLoad(false);
            }catch(error){
                console.error("Error!",error);
            }
        };
        fetchData();
    },[]);


    const columnsDef = [
        { headerName: 'Simbol', field: 'symbol',filter:true },
        { headerName: 'Last price', field: 'lastPrice' },
        { headerName: 'Price Change', field: 'priceChange' },
        { headerName: 'Price percent', field: 'priceChangePercent' },
        { headerName: 'High Price', field: 'highPrice',sortable:true },
        { headerName: 'Low Price', field: 'lowPrice' },
        { headerName: 'volume', field: 'volume' },
        { headerName: 'Quoute volume', field: 'quoteVolume' },
        { headerName: 'Open time', field:'openTime'},
        { headerName: 'Close time', field:'closeTime'},
      ];

      return (
        <div>
          {load ? 
              <h1>Loading...</h1> : (
            <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
              <AgGridReact 
                rowData={rowData}
                columnDefs={columnsDef}
                pagination={true}
                paginationAutoPageSize={true}
              />
            </div>
          )}
        </div>
      );

};
export default AgGridTable;