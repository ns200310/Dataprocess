import Layout from '@/components/layout'
import Pin from '@/components/Pin'
import { Alert, Button, Group, Modal, Stack, Text } from '@mantine/core'
import React, { useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'


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
      <Button variant="filled" size="md" onClick={refreshData}>Refresh</Button>

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