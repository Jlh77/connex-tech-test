import {
  Card,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { Person } from '@mui/icons-material';
import { useGetCustomers } from '../../lib/api';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

export const CustomersList = () => {
  const { data } = useGetCustomers();
  const customers = data?.data.data;

  if (!customers) {
    return <Typography>Loading...</Typography>;
  }

  const Row = ({ index, style }: ListChildComponentProps) => {
    const customer = customers[index];

    return (
      <ListItem style={style} key={customer.id}>
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText primary={customer.name} />
      </ListItem>
    );
  };

  return (
    <Card>
      <Typography variant="h6">Customers</Typography>
      <FixedSizeList
        height={800}
        width={'100%'}
        itemSize={46}
        itemCount={customers?.length}
        overscanCount={5}
      >
        {Row}
      </FixedSizeList>
    </Card>
  );
};
