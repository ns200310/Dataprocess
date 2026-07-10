import Layout from '@/components/layout'
import Pin from '@/components/Pin'
import { ActionIcon, Alert, Button, Divider, Group, Modal, Space, Stack, Tabs, Text, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { DataTable } from 'mantine-datatable';
const PAGE_SIZE = 5;
import { FaChevronLeft } from "react-icons/fa";
import { LineChart } from '@mantine/charts';


const AuctionsDataPage = ({ data }: { data: AuctionsData[] }) => {

  const [page, setPage] = useState<number>(1);

  const [records, setRecords] = useState(data.slice(0, PAGE_SIZE));

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(data.slice(from, to));
  }, [page]);

  return (
    <Layout>
      <ActionIcon
        component="a"
        href='/'
        variant="filled" color="orange" aria-label="Open">
        <FaChevronLeft style={{ width: '70%', height: '70%' }} />
      </ActionIcon>


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
          { accessor: 'dt', title: "Date" },
          { accessor: 'winning_bid_mean' },
        ]}
        totalRecords={data.length}
        recordsPerPage={PAGE_SIZE}
        page={page}
        onPageChange={(p) => setPage(p)}
      />

      <Space h="xl" />


      <Divider />




      <Tabs defaultValue="auction_lots_count">
        <Tabs.List>
          <Tabs.Tab value="auction_lots_count">
            Auction lots count
          </Tabs.Tab>
          <Tabs.Tab value="atv" >
            Auction Trading Volume
          </Tabs.Tab>
          <Tabs.Tab value="winning_bid_mean">
            Winning bid mean
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="auction_lots_count">
          <Space h="md" />

          <LineChart
            h={300}
            data={data}
            dataKey="dt"
            series={[

              { name: 'all_auctions_lots_count', color: 'orange.6' },
              { name: 'auction_lots_count', color: 'blue.6' },
            ]}
            curveType="natural"
          />
        </Tabs.Panel>

        <Tabs.Panel value="atv">
          <Space h="md" />

          <LineChart
            h={300}
            data={data}
            dataKey="dt"
            series={[
              { name: 'auction_trading_volume', color: 'yellow.6' },
            ]}
            curveType="natural"
          />
        </Tabs.Panel>

        <Tabs.Panel value="winning_bid_mean">
          <Space h="md" />

          <LineChart
            h={300}
            data={data}
            dataKey="dt"
            series={[

              { name: 'winning_bid_mean', color: 'teal.6' },
            ]}
            curveType="natural"
          />
        </Tabs.Panel>
      </Tabs>
    </Layout>
  )
}

export default AuctionsDataPage