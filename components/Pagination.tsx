import * as React from 'react';
import Pagination from '@mui/material/Pagination';

const Paginations: React.FC<{ count: number; page: number; onChange: (event: React.ChangeEvent<unknown>, value: number) => void }> = ({ count, page, onChange }) => {
    return (
        <Pagination
            count={count}
            page={page}
            onChange={onChange}
            variant="outlined"
            shape="rounded"
            color="primary"
        />
    );
};

export default Paginations;
