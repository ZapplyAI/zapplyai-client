// src/PreviewFrame.js
import React, { useEffect } from 'react'
import {
  MRT_GlobalFilterTextField,
  MRT_TableBodyCellValue,
  MRT_TablePagination,
  MRT_ToolbarAlertBanner,
  flexRender,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from 'material-react-table'
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from '@mui/material'
import { data } from './makeData'
import { Delete, Archive, PowerSettingsNew } from '@mui/icons-material'
import { WebApp, YourWebApp } from '@/lib/type'

// Updated columns definition
const columns: MRT_ColumnDef<YourWebApp>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    Cell: ({ cell }) => (
      <Typography variant="body1">{cell.getValue() as string}</Typography>
    ),
  },
  {
    accessorKey: 'lastModified',
    header: 'Last modified',
    Cell: ({ cell }) => {
      return (
        <Typography variant="body_light">
          {cell.getValue() as string}
        </Typography>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    Cell: ({ cell }) => {
      const status = cell.getValue() as string
      const colorMap = {
        Active: 'green',
        Building: 'orange',
        Built: 'blue',
      }

      return (
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            justifyContent: 'center',
            borderRadius: '999px',
            border: '1px solid #D0D0D0',
            padding: '2px 8px',
          }}
        >
          <Box
            sx={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              backgroundColor: colorMap[status] || 'gray',
              marginRight: '8px',
            }}
          />
          <Typography variant="body_light">{status}</Typography>
        </Stack>
      )
    },
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    Cell: ({ row }) => (
      <Stack direction="row" spacing={1}>
        <Button
          startIcon={<PowerSettingsNew />}
          sx={{
            backgroundColor: '#282636',
            color: '#D9D9D9',
            borderRadius: '4px',
            padding: '4px 8px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#3b3b48',
            },
          }}
        >
          Turn off
        </Button>
        <Button
          startIcon={<Archive />}
          sx={{
            backgroundColor: '#282636',
            color: '#D9D9D9',
            borderRadius: '4px',
            padding: '4px 8px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#3b3b48',
            },
          }}
        >
          Archive
        </Button>
        <Button
          startIcon={<Delete />}
          sx={{
            backgroundColor: '#282636',
            color: '#D9D9D9',
            borderRadius: '4px',
            padding: '4px 8px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#3b3b48',
            },
          }}
        >
          Delete
        </Button>
      </Stack>
    ),
  },
  {
    accessorKey: 'url',
    header: 'Access url',
    Cell: ({ cell }) => {
      return (
        <Typography variant="body_light">
          <a
            href={cell.getValue() as string}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            {cell.getValue() as string}
          </a>
        </Typography>
      )
    },
  },
]

interface YourAppsProps {
  isMobile?: boolean
  allApps: WebApp[]
}

const YourApps = ({ isMobile = false, allApps = [] }: YourAppsProps) => {
  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    initialState: {
      pagination: { pageSize: 5, pageIndex: 0 },
      showGlobalFilter: true,
    },
    muiPaginationProps: {
      rowsPerPageOptions: [5, 10, 15],
      variant: 'outlined',
    },
    paginationDisplayMode: 'pages',
  })

  useEffect(() => {}, [])

  return (
    <Stack sx={{ m: '2rem' }}>
      <Typography
        variant={'h5'}
        style={{
          marginBottom: '12px',
          textTransform: 'none',
          color: '#D0D0D0',
        }}
      >
        Your apps (3)
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <MRT_GlobalFilterTextField table={table} />
        <MRT_TablePagination table={table} />
      </Box>
      <TableContainer>
        <Table sx={{ borderCollapse: 'collapse' }}>
          <TableHead>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow
                key={headerGroup.id}
                sx={{ backgroundColor: '#282636' }}
              >
                {headerGroup.headers.map(header => (
                  <TableCell
                    align="left"
                    variant="head"
                    key={header.id}
                    sx={{
                      fontWeight: 300,
                      fontSize: '14px',
                      color: '#D0D0D0',
                      border: 'none',
                      padding: '16px',
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.Header ??
                            header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row, rowIndex) => (
              <TableRow key={row.id} selected={row.getIsSelected()}>
                {row.getVisibleCells().map((cell, columnIndex) => (
                  <TableCell
                    align="left"
                    variant="body"
                    key={cell.id}
                    sx={{
                      border: 'none',
                      padding: '16px',
                    }}
                  >
                    <MRT_TableBodyCellValue
                      cell={cell}
                      table={table}
                      staticRowIndex={rowIndex}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
    </Stack>
  )
}

export default YourApps
