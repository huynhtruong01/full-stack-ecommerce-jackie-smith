import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import ordersApi from '../../../api/ordersApi'
import DataMessageEmpty from '../../../components/DataMessageEmpty'
import OrderData from '../components/OrderData'

OrdersHome.propTypes = {}

function OrdersHome() {
    const [orderList, setOrderList] = useState([])

    useEffect(() => {
        const getAllOrder = async () => {
            try {
                const { orders } = await ordersApi.getAllApproved()
                setOrderList(orders)
            } catch (error) {
                console.log('Error: ', error)
            }
        }

        getAllOrder()
    }, [])

    console.log(orderList)

    return (
        <Box>
            <Box mb="8px">
                <Typography variant="h6" component="h2" color={`${grey[900]}`}>
                    Orders
                </Typography>
            </Box>
            <Box width="100%">
                {orderList.length === 0 && <DataMessageEmpty text="Orders is empty" />}
                {orderList.length > 0 && (
                    <Box>
                        <OrderData orderList={orderList} />
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default OrdersHome
