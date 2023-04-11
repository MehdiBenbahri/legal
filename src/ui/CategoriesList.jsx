import {Box, Tab, Tabs, Typography, useTheme} from "@mui/material";
import {useEffect, useState} from "react";
import {getCategories} from "../services/Categories.js";
import Skeleton from '@mui/material/Skeleton';
import CloseIcon from '@mui/icons-material/Close';
function CategoriesList() {
    const theme = useTheme();
    const [categories, setCategories] = useState([]);
    const [selectedCat, setSelectedCat] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            if (categories.length === 0) {
                getCategories().then(
                    (res) => {
                        if (res.status === 200) {
                            setCategories(res.data.data)
                        } else {
                            console.log(res)
                        }
                    }
                )
            }
        }, 250)
    }, [categories])

    function fakeLoadElement() {
        let list = []
        for (let i = 0; i < 25; i++) {
            list.push(
                <Box key={"fake-loading-" + i}
                     className={"d-flex flex-column justify-content-center align-items-center"}>
                    <Skeleton sx={{bgcolor: 'grey.800'}} variant="circular" width={30} height={30}/>
                    <Box className={"font-monospace text-muted"} color={"primary"}>
                        <Skeleton sx={{bgcolor: 'grey.800'}} width={60} height={20}/>
                    </Box>
                </Box>
            );
        }
        return list;
    }

    return (
        <Box className={"d-flex justify-content-evenly align-content-center w-100"}>
            <Tabs variant="scrollable"
                  allowScrollButtonsMobile={true}
                  value={selectedCat}
                  TabIndicatorProps={{style: {display: "none"}}}
                  unselectable={'on'}
                  onChange={(e, value) => {
                      setSelectedCat(value);
                  }}
                  scrollButtons="auto">
                <Tab value={false}
                     label={
                         <Typography
                             className={`font-monospace text-secondary `}
                             fontSize={"0.75rem"}
                             value={false}>
                             TOUT
                         </Typography>
                     }
                     icon={<CloseIcon className={"text-secondary"} />}
                >
                </Tab>
                {
                    categories.length === 0 ?
                        (
                            fakeLoadElement().map((el, index) => {
                                return (
                                    <Tab key={"tab-loading-category-" + index} value={index} label={el}>
                                    </Tab>
                                )
                            })
                        ) : (
                            categories.sort((a, b) => a.class.localeCompare(b.class)).map((el, index) => {
                                return (
                                    <Tab key={`tab-category-${el.id}`}
                                         value={el.id}
                                         label={
                                             <Typography
                                                 className={`font-monospace text-danger ${selectedCat === el.id ? ('text-' + el.class) : 'text-muted'}`}
                                                 fontSize={"0.75rem"}
                                                 value={el.id}>
                                                 {el.name}
                                             </Typography>
                                         }
                                         className={"px-3"}
                                         icon={<span
                                             className={`material-icons ${selectedCat === el.id ? ('text-' + el.class) : 'text-muted'}`}>{el.icon}</span>}>
                                    </Tab>
                                )
                            })
                        )
                }
            </Tabs>

        </Box>
    )
}

export default CategoriesList;