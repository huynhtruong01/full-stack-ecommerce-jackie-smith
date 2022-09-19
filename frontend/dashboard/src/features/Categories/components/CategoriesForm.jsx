import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Typography, LinearProgress } from '@mui/material'
import { orange, grey } from '@mui/material/colors'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import InputField from '../../../components/formControls/InputField'

CategoriesForm.propTypes = {}

function CategoriesForm({ values, onSubmit = null }) {
    const schema = yup
        .object()
        .shape({
            name: yup
                .string()
                .required('Please enter name of category')
                .test(
                    'at-least-two-words',
                    'Please enter at least a word or at least three letter',
                    (value) => value.split(' ').filter((x) => !!x && x.length >= 3).length >= 1
                ),
        })
        .required()

    const form = useForm({
        defaultValues: {
            name: values?.name || '',
        },
        resolver: yupResolver(schema),
    })

    const handleSubmit = async (values) => {
        if (!onSubmit) return
        try {
            await onSubmit(values)
        } catch (error) {
            console.log('Errors: ', error)
        }
    }

    const {
        formState: { isSubmitting },
    } = form

    return (
        <Box>
            {isSubmitting && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: '64px',
                        left: 0,
                        width: '100%',
                    }}
                >
                    <LinearProgress
                        sx={{
                            backgroundColor: orange[100],

                            '.MuiLinearProgress-bar': {
                                backgroundColor: orange[600],
                            },
                        }}
                    />
                </Box>
            )}
            <Typography
                variant="h5"
                component="h2"
                textAlign="center"
                textTransform="uppercase"
                fontWeight={600}
                color={`${grey[700]}`}
            >
                Add category
            </Typography>
            <Box component="form" onSubmit={form.handleSubmit(handleSubmit)}>
                <Box mb="20px">
                    <InputField
                        name="name"
                        label="Name"
                        form={form}
                        placeholder="Please enter name"
                    />
                </Box>
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={isSubmitting}
                    sx={{
                        p: '10px',
                        fontSize: '1.1rem',
                        backgroundColor: orange[400],

                        '&:hover': {
                            backgroundColor: orange[700],
                        },

                        '&.Mui-disabled': {
                            backgroundColor: orange[100],
                            color: orange[300],
                        },
                    }}
                >
                    Add
                </Button>
            </Box>
        </Box>
    )
}

export default CategoriesForm
