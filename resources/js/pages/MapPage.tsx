import Layout from '@/components/layout'
import Pin from '@/components/Pin'
import { ActionIcon, Alert, Button, Flex, Group, Modal, Stack, Text, Title } from '@mantine/core'
import React, { useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { MdRefresh } from "react-icons/md";


const MapPage = ({data}: { data: MapData[]}) => {

  const [alert, setAlert] = useState<AlertData | null>(null)

  const [modelOpened, setModelOpened] = useState<boolean>(false)
  const refreshData = async () => { 
    let response = await fetch('/map/refresh', {
      method:'POST'
    })

    let data = await response.json();


    if (data.status == 500) {
      setAlert({
        type: 'error',
        message: data.message
      });
    }

    setAlert({
        type: 'success',
        message: data.message
    });

  }
  return (
    <Layout>
      <Flex
        gap="md"
        justify="flex-end"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <ActionIcon variant="filled" color="green" aria-label="Refresh" onClick={()=>setModelOpened(true)}>
          <MdRefresh style={{ width: '70%', height: '70%' }} />
        </ActionIcon>

      </Flex>


      {alert && (
          <Alert
            title={alert.type === 'success' ? 'Success' : 'Error'}
            color={alert.type === 'success' ? 'green' : 'red'}
            withCloseButton
            onClose={() => setAlert(null)}
          >
            {alert.message}
          </Alert>
      )
      }


      <Modal
        opened={modelOpened}
        onClose={() => setModelOpened(false)}
        title="Confirm Data Refresh"
        centered
        zIndex={200}
      >
        <Stack gap="md">
          <Text size="sm">
            Do you want to refresh the data? Note by doing this you will call the api about 150 times so please dont run it always as it could result in too many request issues.
          </Text>
          <Group justify="flex-end" gap="sm">
            <Button variant="subtle" color="gray" onClick={() => setModelOpened(false)}>
              Cancel
            </Button>
            <Button color="blue" onClick={refreshData}>
              Yes
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Title order={2}>Distelleries</Title>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={2}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          data && data.map((iterateData: iterateData, index:number) => { 
            return <Pin key={index} message={iterateData.display_name} lat={iterateData.latitude} long={iterateData.longitude}/>
           })
        }
      </MapContainer>
    </Layout>
  )
}

export default MapPage