import {Box, Button, Tab, Tabs, TextField, Typography, useTheme} from "@mui/material";
import {useEffect, useState} from "react";
import AnnouncePagination from "../../ui/announce/AnnouncePagination.jsx";
import {getRecruitment} from "../../services/Recruitment.js";
import RecruitmentItem from "../../ui/recrutment/RecruitmentItem.jsx";

function Recruitment() {
    const theme = useTheme();
    const [searchValue, setSearchValue] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [disableChange, setDisableChange] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [recruitment, setRecruitment] = useState([]);
    const [status, setStatus] = useState('Publiée');


    useEffect(() => {
        if (!loaded) {
            setDisableChange(true);
            getRecruitment(status, currentPage, (isSearching ? searchValue : '')).then((res) => {
                if (res.status === 200) {
                    setRecruitment(res.data.data);
                    setPageCount(Math.ceil(res.data.meta.filter_count / 15))
                } else {
                    console.log(res)
                }
                setLoaded(true);
            })
            setTimeout(() => {
                setDisableChange(false);
            }, 500)
        }
    }, [recruitment, loaded])

    return (
        <Box className={"p-3"}>
            <Box
                className={"bg-light-blur w-100 p-3 rounded-3 d-flex flex-wrap justify-content-between align-content-center align-items-center shadow-sm"}>
                <Box className={"d-flex justify-content-between align-content-center w-100 mb-3"}>
                    <Tabs value={status}
                          onChange={(e, val) => {
                              setStatus(val)
                              setLoaded(false);
                          }}
                          TabIndicatorProps={{
                              style: {
                                  backgroundColor: (status === "Publiée" ? theme.palette.success.main : theme.palette.warning.main),
                                  height: "100%",
                                  borderRadius: "0.25rem"
                              }
                          }}
                          disabled={disableChange}
                    >
                        <Tab disabled={disableChange}
                             value={"Publiée"}
                             label={
                                 <Typography
                                     sx={{zIndex: 1000, color: theme.palette.dark.opacity50}}>
                                     Publiée
                                 </Typography>
                             }/>
                        <Tab disabled={disableChange} value={"Archivée"}
                             label={
                                 <Typography
                                     sx={{zIndex: 1000, color: theme.palette.dark.opacity50}}>
                                     Archivée
                                 </Typography>
                             }/>
                    </Tabs>
                </Box>
                <Box className={"mb-3"}>
                    <AnnouncePagination handleCurrentPageChange={(e) => {
                        setCurrentPage(e);
                        setLoaded(false);
                    }} count={pageCount} page={currentPage}/>
                </Box>
                <Box className={"d-flex justify-content-between align-content-center align-items-center"}>
                    <TextField variant={"outlined"}
                               className={"shadow-sm"}
                               value={searchValue}
                               onChange={(e) => setSearchValue(e.target.value)}
                               disabled={disableChange}
                               placeholder={"LSPD, Commercial au concessionnaire bateau..."}
                               size={"small"}/>
                    <Button variant={"contained"}
                            disabled={disableChange}
                            onClick={() => {
                                setLoaded(false);
                                setIsSearching(true);
                                setCurrentPage(1);
                            }}
                            className={"ms-2"}
                    >
                        Recherche
                    </Button>
                    {
                        isSearching ?
                            (
                                <Button variant={"contained"}
                                        color={"danger"}
                                        onClick={() => {
                                            setSearchValue('');
                                            setLoaded(false);
                                            setIsSearching(false);
                                        }}
                                        disabled={disableChange}
                                        className={"ms-2 text-light"}
                                >
                                    Reset
                                </Button>
                            ) :
                            ('')
                    }
                    <Button variant={"contained"}
                            disabled={disableChange}
                            color={"success"}
                            onClick={() => {
                                setLoaded(false);
                                setIsSearching(true);
                                setCurrentPage(1);
                            }}
                            className={"ms-2"}
                    >
                        Actualiser
                    </Button>
                </Box>
            </Box>
            {
                recruitment.length > 0 ?
                    (<Box className={"row justify-content-evenly p-2"}>
                        <Box className={"col-sm-12 col-md-6 col-lg-4"}>
                            {
                                recruitment.slice(0, 5).map((data) => {
                                    return (
                                        <RecruitmentItem key={"recruitment-item-" + data.id} data={data}/>
                                    )
                                })
                            }
                        </Box>
                        {
                            recruitment.length > 5 ? (
                                <Box className={"col-sm-12 col-md-6 col-lg-4"}>
                                    {
                                        recruitment.slice(5, 10).map((data) => {
                                            return (
                                                <RecruitmentItem key={"recruitment-item-" + data.id} data={data}/>
                                            )
                                        })
                                    }
                                </Box>
                            ) : ('')
                        }
                        {
                            recruitment.length > 10 ? (
                                <Box className={"col-sm-12 col-md-12 col-lg-4"}>
                                    {
                                        recruitment.slice(10, 15).map((data) => {
                                            return (
                                                <RecruitmentItem key={"recruitment-item-" + data.id} data={data}/>
                                            )
                                        })
                                    }
                                </Box>) : ('')
                        }
                    </Box>) :
                    (<Box className={"bg-light-blur p-3 rounded-3 my-3 d-flex justify-content-evenly align-content-center"}>
                        <Typography>
                            Aucun résultat ne correspond à vos filtres 😥
                        </Typography>
                    </Box>)
            }

        </Box>
    )
}

export default Recruitment;