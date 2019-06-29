import React, { useState, useEffect } from 'react'
import Book from './book'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import styled from 'styled-components'
import { IBook } from '@gemini'
import { getAllBooks, getBooksByClass,getBookByName } from '@/services/book'
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button'
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => createStyles({
  search: {
    width: '500px',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
    border: "rgb(66,165,245) solid 2px"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '500px',
    [theme.breakpoints.down('md')]: {
      width: 200,
    },
  },
  formControl: {
    margin: theme.spacing(3),
  },
  group: {
    margin: theme.spacing(1, 0),
  }
}))
const Root = styled.div`
  display:flex;
  flex-direction:column;
  width:100%;
  align-items:center;
  padding-top: 15px;
`
const Row = styled.div`
  display: flex;
`

export default () => {
  const classes = useStyles()
  const [searchValue, setSearchValue] = useState('')
  const [books, setBooks] = useState<IBook[]>([])
  const [page, setPage] = useState(1)
  const [tip, setTip] = useState('')
  // const [allBooks] = useFetcher(getAllBooks)
  // if(allBooks) setBooks(allBooks)
  async function getBooks(){
    const res = await getAllBooks()
    res.map(data => setBooks(data))
  }
  useEffect(() => {
    getBooks()
  }, [])

  const [type, setType] = useState("0")
  const handleChange = async (event: React.ChangeEvent<unknown>) => {
    setType((event.target as HTMLInputElement).value);
    const res = await getBooksByClass((event.target as HTMLInputElement).value, page)
    res.map(data => setBooks(data))
  }
  const handleSearchChange = (e:any) => setSearchValue(e.target.value)
  const search = async() => {
    const data = await getBookByName(searchValue)
    data.map(d=>{
      if(d&&JSON.stringify(d)!=='{}'){
        setBooks([d])
      }else{
        setBooks([])
        setTip('没有找到您搜索的结果')
      }
    })
  }
  return <Root>
    <Row>
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon onClick={search} color="primary" />
      </div>
      <InputBase
      value={searchValue}
      onChange={handleSearchChange}
        placeholder="搜索"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
      />
    </div>
    <Button variant="contained" color="primary" onClick={search}>搜索</Button></Row>
    <FormControl className={classes.formControl}>
      <RadioGroup
        row
        aria-label="type"
        name="type"
        className={classes.group}
        value={type}
        onChange={handleChange}
      >
        <FormControlLabel value="1" control={<Radio />} label="网络文学" />
        <FormControlLabel value="2" control={<Radio />} label="教育" />
        <FormControlLabel value="3" control={<Radio />} label="小说" />
        <FormControlLabel value="4" control={<Radio />} label="文艺" />
        <FormControlLabel value="5" control={<Radio />} label="青春文学" />
        <FormControlLabel value="6" control={<Radio />} label="动漫" />
        <FormControlLabel value="7" control={<Radio />} label="童书" />
        <FormControlLabel value="8" control={<Radio />} label="人文社科" />
        <FormControlLabel value="9" control={<Radio />} label="经管" />
        <FormControlLabel value="10" control={<Radio />} label="成功" />
        <FormControlLabel value="11" control={<Radio />} label="生活" />
        <FormControlLabel value="12" control={<Radio />} label="外语" />
      </RadioGroup>
    </FormControl>
    <Typography variant="h4">{tip}</Typography>
    <List>
      {
        books && books.map((i: IBook) => (
          <ListItem>
            <Book data={i} />
          </ListItem>
        ))
      }
    </List>
  </Root>
}
