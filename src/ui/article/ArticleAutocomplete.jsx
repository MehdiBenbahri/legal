import {Box, Checkbox, Chip, TextField, Typography, useTheme} from "@mui/material";
import Autocomplete, {
    autocompleteClasses,
} from '@mui/material/Autocomplete';
import {useEffect, useState} from "react";
import {getArticles} from "../../services/ArticleService.js";

function ArticleAutocomplete({className}) {
    const theme = useTheme();
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (options.length === 0) {
            getArticles().then(
                (res) => {
                    if (res.status === 200) {
                        setOptions(res.data.data)
                    } else {
                        console.log(res)
                    }
                }
            )
        }
    }, [options])

    const [selectedArticle, setSelectedArticle] = useState([]);
    return (
        <Autocomplete className={`${className}`}
                      options={options}
                      sx={{backgroundColor: theme.palette.dark.opacity50, backdropFilter: "blur(5px)"}}
                      value={selectedArticle}
                      multiple
                      renderInput={(params) => <TextField {...params}
                                                          sx={{
                                                              display: 'inline-block',
                                                              '& input': {
                                                                  bgcolor: 'transparent',
                                                                  color: (theme) => theme.palette.getContrastText(theme.palette.dark.opacity50),
                                                              },
                                                              [`& .${autocompleteClasses.listbox}`]: {
                                                                  padding: 0
                                                              },
                                                          }}
                                                          label={<Typography
                                                              className={"text-muted"}>Acheter une arme...</Typography>}
                                                          placeholder={"Tec-9, Fusil compact, AK-47..."}/>}
                      color={"primary"}
                      variant={"outlined"}
                      disableClearable
                      isOptionEqualToValue={(option, value) => {
                          return option.id = value.id
                      }}
                      placeholder={"Ak-Compact, Tech-9"}
                      getOptionLabel={(option) => {
                          return option.title
                      }}
                      renderTags={(value, getTagProps) =>
                          value.map((opt, index) => (
                              <Chip key={'option-chip-' + opt.id + '-' + index} variant="outlined"
                                    label={(
                                        <Box className={"d-flex justify-content-between align-content-center"}>
                                            <Typography className={"font-monospace"} color={theme.palette.primary.main}>
                                                {
                                                    opt.title
                                                }
                                            </Typography>
                                        </Box>
                                    )}
                                    className={"border-yellow-paper m-1"}
                                    onClick={() => {
                                        setSelectedArticle(selectedArticle.filter(el => el.title !== opt.title))
                                    }
                                    }
                                    clickable={true}
                              />
                          ))
                      }
                      onChange={(e) => setSelectedArticle(e)}
                      renderOption={(props, opt, state) =>
                          (
                              <Box key={"option-rendered-" + opt.id + "-" + opt.title}
                                   sx={{backgroundColor: theme.palette.dark.main}}
                                   className={"p-2 text-muted d-flex justify-content-between align-content-center"}>

                                  <Box
                                      className={"d-flex flex-column justify-content-center align-content-center"}>
                                      <Typography variant={"overline"} className={"p-0"}>
                                          {
                                              opt.title
                                          }
                                      </Typography>
                                      <Typography fontSize={"0.75rem"} className={"font-monospace p-0"}>
                                          {
                                              opt.true_name
                                          }
                                      </Typography>
                                  </Box>
                                  <Box className={"d-flex justify-content-between align-content-center align-content-center"}>
                                      <img alt={opt.title} width={"120rem"} height={"auto"}
                                           src={import.meta.env.VITE_API_BASE + "assets/" + opt.image_id}/>
                                      <Box className={"d-flex flex-column justify-content-center align-content-center"}>
                                          <Checkbox
                                              checked={selectedArticle.filter(el => el.title === opt.title).length > 0}
                                              onClick={() => {
                                                  if (selectedArticle.filter(el => el.title === opt.title).length > 0) {
                                                      setSelectedArticle(selectedArticle.filter(el => el.title !== opt.title))
                                                  } else {
                                                      setSelectedArticle([...selectedArticle, opt])
                                                  }
                                              }}
                                              color={"primary"}>
                                          </Checkbox>
                                      </Box>
                                  </Box>
                              </Box>
                          )
                      }>
        </Autocomplete>
    )
}

export default ArticleAutocomplete;