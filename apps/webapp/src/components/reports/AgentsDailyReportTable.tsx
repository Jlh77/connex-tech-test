import { Alert, Box, Button, Card, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { DataTable } from '../common/DataTable';
import {
  GetAgentDailyReport200DataItem,
  useGetAgentDailyReport,
} from '../../lib/api';
import { formatDuration } from '../../utils/formatDuration';

type ReportRow = GetAgentDailyReport200DataItem;

const columns: GridColDef<ReportRow>[] = [
  {
    field: 'date',
    headerName: 'Date',
    type: 'date',
    flex: 1,
    minWidth: 120,
    // Parse as local midnight so the date doesn't shift in negative UTC offsets
    valueGetter: (value: ReportRow['date']) =>
      value ? new Date(`${value}T00:00:00`) : null,
  },
  {
    field: 'agent_name',
    headerName: 'Agent',
    flex: 1.5,
    minWidth: 160,
  },
  {
    field: 'total_interactions',
    headerName: 'Total Interactions',
    type: 'number',
    flex: 1,
    minWidth: 140,
  },
  {
    field: 'average_length_seconds',
    headerName: 'Average Interaction Length',
    type: 'number',
    flex: 1,
    minWidth: 200,
    valueFormatter: (value: ReportRow['average_length_seconds']) =>
      value == null ? '—' : formatDuration(value),
  },
];

const getRowId = (row: ReportRow) => `${row.date}-${row.agent_id}`;

const ErrorUI = ({ onRetry }: { onRetry: () => void }) => (
  <Alert
    severity="error"
    action={
      <Button color="inherit" size="small" onClick={onRetry}>
        Retry
      </Button>
    }
  >
    Unable to load the agents daily report.
  </Alert>
);

export const AgentsDailyReportTable = () => {
  const { data, isPending, isError, refetch } = useGetAgentDailyReport();
  const rows = data?.data.data ?? [];

  return (
    <Card>
      <Typography variant="h6">Agents Daily Report</Typography>

      {isError && !data ? (
        <ErrorUI onRetry={() => refetch()} />
      ) : (
        <Box sx={{ height: 800 }}>
          <DataTable
            rows={rows}
            columns={columns}
            getRowId={getRowId}
            loading={isPending}
            initialState={{
              sorting: { sortModel: [{ field: 'date', sort: 'desc' }] },
            }}
          />
        </Box>
      )}
    </Card>
  );
};
