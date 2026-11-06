import { Theme, Components } from '@mui/material/styles';
import { gridClasses } from '@mui/x-data-grid';
import type {} from '@mui/x-data-grid/themeAugmentation';

export const dataGridCustomizations: Components<Theme> = {
  MuiDataGrid: {
    styleOverrides: {
      root: ({ theme }) => ({
        '--DataGrid-overlayHeight': '300px',
        overflow: 'clip',
        borderColor: (theme.vars || theme).palette.divider,
        backgroundColor: (theme.vars || theme).palette.background.default,
        [`& .${gridClasses.columnHeader}`]: {
          backgroundColor: (theme.vars || theme).palette.background.paper,
        },
        [`& .${gridClasses.footerContainer}`]: {
          backgroundColor: (theme.vars || theme).palette.background.paper,
        },
      }),
      cell: ({ theme }) => ({
        borderTopColor: (theme.vars || theme).palette.divider,
      }),
      row: ({ theme }) => ({
        '&.even': {
          backgroundColor: (theme.vars || theme).palette.action.hover,
        },
        // Distinct from action.selected so hover never looks like selection
        '&:hover': {
          backgroundColor: (theme.vars || theme).palette.action.focus,
        },
      }),
      columnHeaderTitle: {
        fontWeight: 500,
      },
      columnSeparator: ({ theme }) => ({
        color: (theme.vars || theme).palette.divider,
      }),
    },
  },
};
