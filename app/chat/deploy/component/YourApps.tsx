// src/PreviewFrame.js
import React, { CSSProperties, useEffect, useRef, useState } from 'react'
// @ts-ignore
import { WebApp, YourWebApp } from '@/lib/type'

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
} from '@mui/material'
import { data } from './makeData'

const columns: MRT_ColumnDef<YourWebApp>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'lastModified',
    header: 'Last modified',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
  },
  {
    accessorKey: 'url',
    header: 'Access url',
  },
]

interface YourAppsProps {
  isMobile?: boolean
  allApps: WebApp[]
}

const YourApps = ({ isMobile = false, allApps = [] }: YourAppsProps) => {
  // console.log('PreviewFrameProps htmlContent', htmlContent)

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
        variant={'h4'}
        style={{
          marginBottom: '12px',
          textTransform: 'none',
          // fontSize: '14px',
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
        {/**
         * Use MRT components along side your own markup.
         * They just need the `table` instance passed as a prop to work!
         */}
        <MRT_GlobalFilterTextField table={table} />
        <MRT_TablePagination table={table} />
      </Box>
      {/* Using Vanilla Material-UI Table components here */}
      <TableContainer>
        <Table>
          {/* Use your own markup, customize however you want using the power of TanStack Table */}
          <TableHead>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableCell align="center" variant="head" key={header.id}>
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
                {row.getVisibleCells().map((cell, _columnIndex) => (
                  <TableCell align="center" variant="body" key={cell.id}>
                    {/* Use MRT's cell renderer that provides better logic than flexRender */}
                    <MRT_TableBodyCellValue
                      cell={cell}
                      table={table}
                      staticRowIndex={rowIndex} //just for batch row selection to work
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
