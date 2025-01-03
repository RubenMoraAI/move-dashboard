import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataGridWrapper from './DataGridWrapper'; 

jest.mock('../Header', () => {
  const MockHeader = ({ name }: { name: string }) => <div>{name}</div>;
  MockHeader.displayName = 'Header';
  return MockHeader;
});
jest.mock('@mui/x-data-grid', () => ({
  DataGrid: ({ rows, columns }: { rows: any[]; columns: any[] }) => (
    <div>
      {rows.length} rows, {columns.length} columns
    </div>
  ),
}));

describe('DataGridWrapper Component', () => {
  const mockProps = {
    title: 'Test Title',
    rows: [{ id: 1, name: 'Row 1' }, { id: 2, name: 'Row 2' }],
    columns: [{ field: 'name', headerName: 'Name', width: 150 }],
    getRowId: (row: any) => row.id,
  };

  it('renders the header with the provided title', () => {
    render(<DataGridWrapper {...mockProps} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders the DataGrid with the provided rows and columns', () => {
    render(<DataGridWrapper {...mockProps} />);
    expect(screen.getByText('2 rows, 1 columns')).toBeInTheDocument();
  });
});