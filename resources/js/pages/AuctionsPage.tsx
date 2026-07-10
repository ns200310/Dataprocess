import Layout from '@/components/layout'
import Pin from '@/components/Pin'
import { Alert, Button, Group, Modal, Stack, Text, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { DataTable } from 'mantine-datatable';
import { Box } from '@mantine/core';
const PAGE_SIZE = 5;

const AuctionsPage = ({data}: { data: Auctions[]}) => {

  const [alert, setAlert] = useState<AlertData | null>(null)
  const [page, setPage] = useState<number>(1);

  const [records, setRecords] = useState(data.slice(0, PAGE_SIZE));

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(data.slice(from, to));
  }, [page]);

  const [modelOpened, setModelOpened] = useState<boolean>(false)
  
  return (
    <Layout>
      <Title order={2}>All Auctions</Title>


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
          accessor: 'name',
          // this column has a custom title
          title: 'Name',
          // right-align column
          textAlign: 'right',
        },
        { accessor: 'buyers_fee' },
        { accessor: 'listing_fee' },
        { accessor: 'sellers_fee' },
        { accessor: 'reserve_fee' },
        { accessor: 'slug',

          title: 'More',

          render: ({ slug }) => (
            <Button       
            variant="gradient"
            gradient={{ from: 'violet', to: 'indigo', deg: 90 }}
            component="a" 
            href={'/'+ slug}>More Info</Button>
          ),
        },
        { accessor: 'url',
          title: 'Action',

          render: ({ url }) => (
            <Button       
            variant="gradient"
            gradient={{ from: 'blue', to: 'pink', deg: 90 }} 
            component="a" 
            target='_blank'
            href={url}>Visit</Button>
          ),
         },
      ]}
      totalRecords={data.length}
      recordsPerPage={PAGE_SIZE}
      page={page}
      onPageChange={(p) => setPage(p)}
    />




    </Layout>
  )
}

export default AuctionsPage