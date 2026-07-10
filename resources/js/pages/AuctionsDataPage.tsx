import Layout from '@/components/layout'
import Pin from '@/components/Pin'
import { Alert, Button, Group, Modal, Stack, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { DataTable } from 'mantine-datatable';
import { Box } from '@mantine/core';
const PAGE_SIZE = 5;

const AuctionsDataPage = ({data}: { data: AuctionsData[]}) => {

  const [page, setPage] = useState<number>(1);

  const [records, setRecords] = useState(data.slice(0, PAGE_SIZE));

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(data.slice(from, to));
  }, [page]);

  return (
    <Layout>
   

        <DataTable
        withTableBorder
        borderRadius="sm"
        withColumnBorders
        striped
        highlightOnHover
        // provide data
        records={records}
        // define columns
        columns={[
          {
            accessor: 'auction_name',
            // this column has a custom title
            title: 'Name',
            // right-align column
            textAlign: 'right',
          },
          { accessor: 'auction_lots_count' },
          { accessor: 'all_auctions_lots_count' },
          { accessor: 'auction_trading_volume' },
          { accessor: 'dt' ,title: "Date" },
          { accessor: 'winning_bid_mean' },
        ]}
        totalRecords={data.length}
        recordsPerPage={PAGE_SIZE}
        page={page}
        onPageChange={(p) => setPage(p)}
      />




    </Layout>
  )
}

export default AuctionsDataPage