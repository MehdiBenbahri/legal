import {Box, Pagination} from "@mui/material";

function AnnouncePagination({count,page,handleCurrentPageChange}){
    return (
        <Box className={"w-100 d-flex justify-content-evenly align-content-center align-items-center"}>
            <Pagination count={count}
                        onChange={(e,val) => {handleCurrentPageChange(val)}}
                        page={page}
                        color="primary" />
        </Box>
    )
}
export default AnnouncePagination;