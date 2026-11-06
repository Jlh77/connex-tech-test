import { render } from '@testing-library/react';
import { DataGrid, GridColDef, GridRowClassNameParams } from '@mui/x-data-grid';
import { DataTable, DataTableProps } from './DataTable';

// The real DataGrid imports CSS that Node can't load in tests. DataTable's job
// is passing the right props to it, so a stub that records them is enough here.
vi.mock('@mui/x-data-grid', () => ({ DataGrid: vi.fn(() => null) }));

type Row = { id: number; name: string };

const rows: Row[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const columns: GridColDef<Row>[] = [{ field: 'name', headerName: 'Name' }];

// Renders the table and returns the props it passed to DataGrid
const renderTable = (props: Partial<DataTableProps<Row>> = {}) => {
  render(<DataTable rows={rows} columns={columns} {...props} />);
  return vi.mocked(DataGrid).mock.lastCall?.[0] as DataTableProps<Row>;
};

const rowParams = (index: number) =>
  ({
    row: rows[index],
    indexRelativeToCurrentPage: index,
  } as GridRowClassNameParams<Row>);

describe('DataTable', () => {
  afterEach(() => {
    vi.mocked(DataGrid).mockClear();
  });

  it('passes rows and columns through with the app defaults', () => {
    const props = renderTable();

    expect(props.rows).toBe(rows);
    expect(props.columns).toBe(columns);
    expect(props.density).toBe('compact');
    expect(props.disableRowSelectionOnClick).toBe(true);
    expect(props.pageSizeOptions).toEqual([10, 25, 50, 100]);
    expect(props.initialState?.pagination?.paginationModel?.pageSize).toBe(25);
    expect(props.slotProps?.loadingOverlay).toEqual({
      variant: 'skeleton',
      noRowsVariant: 'skeleton',
    });
  });

  it('lets the caller override the defaults', () => {
    const props = renderTable({
      density: 'comfortable',
      pageSizeOptions: [5, 10],
    });

    expect(props.density).toBe('comfortable');
    expect(props.pageSizeOptions).toEqual([5, 10]);
  });

  it('stripes rows and keeps the caller row class names', () => {
    const props = renderTable({
      getRowClassName: ({ row }) => (row.id === 2 ? 'highlight' : ''),
    });

    expect(props.getRowClassName?.(rowParams(0))).toBe('even');
    expect(props.getRowClassName?.(rowParams(1))).toBe('odd highlight');
  });

  it('merges the caller initialState with the default page size', () => {
    const props = renderTable({
      initialState: {
        sorting: { sortModel: [{ field: 'name', sort: 'desc' }] },
        pagination: { paginationModel: { page: 2 } },
      },
    });

    expect(props.initialState?.sorting?.sortModel).toEqual([
      { field: 'name', sort: 'desc' },
    ]);
    expect(props.initialState?.pagination?.paginationModel).toEqual({
      pageSize: 25,
      page: 2,
    });
  });

  it('merges the caller slotProps with the skeleton loading overlay', () => {
    const props = renderTable({
      slotProps: {
        toolbar: { showQuickFilter: true },
        loadingOverlay: { variant: 'linear-progress' },
      },
    });

    expect(props.slotProps?.toolbar).toEqual({ showQuickFilter: true });
    expect(props.slotProps?.loadingOverlay).toEqual({
      variant: 'linear-progress',
      noRowsVariant: 'skeleton',
    });
  });
});
