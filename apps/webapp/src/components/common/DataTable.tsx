import { DataGrid, DataGridProps, GridValidRowModel } from '@mui/x-data-grid';

const DEFAULT_PAGE_SIZE = 25;
const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export type DataTableProps<R extends GridValidRowModel> = DataGridProps<R>;

export const DataTable = <R extends GridValidRowModel>({
  initialState,
  getRowClassName,
  slotProps,
  ...gridProps
}: DataTableProps<R>) => (
  <DataGrid
    density="compact"
    disableRowSelectionOnClick
    pageSizeOptions={DEFAULT_PAGE_SIZE_OPTIONS}
    {...gridProps}
    // Applied after the spread so the defaults are merged with the caller's values, not replaced by them
    getRowClassName={(params) =>
      [
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd',
        getRowClassName?.(params),
      ]
        .filter(Boolean)
        .join(' ')
    }
    slotProps={{
      ...slotProps,
      loadingOverlay: {
        variant: 'skeleton',
        noRowsVariant: 'skeleton',
        ...slotProps?.loadingOverlay,
      },
    }}
    initialState={{
      ...initialState,
      pagination: {
        ...initialState?.pagination,
        paginationModel: {
          pageSize: DEFAULT_PAGE_SIZE,
          ...initialState?.pagination?.paginationModel,
        },
      },
    }}
  />
);
