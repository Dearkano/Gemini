import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { navigate } from '@reach/router'
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { IBook } from '@gemini'
import { getUserByBookName } from '@/services/user'

const useStyles = makeStyles((theme: any) =>
  createStyles({
    card: {
      width: 500,
      display: 'flex',
      [theme.breakpoints.down('md')]: {
        width: 300,
        flexDirection: 'column'
      },
    },
    cardMedia: {
      width: '150px',
      objectFit: 'contain'
    },
    actions: {
      width: '100%'
    }
  }),
);

const Column = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`

const OriPrice = styled.div`
  text-decoration: line-through;
  font-size:12px;
`
const Price = styled.div`
  color: red;
  font-size: 22px;
`

interface Props {
  data: IBook
}

const ImgMediaCard: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { data } = props
  const [seller, setSeller] = useState(null)

  useEffect(() => {
    getSeller()
  }, [])
  async function getSeller() {
    const res = await getUserByBookName(data.name)
    res.map((user: any) => {
      setSeller(user)
    })
  }

  const dial = async () => {
    if (seller !== null) {
      navigate(`/messageDetail/${seller.id}`)
    }
  }

  return (
    <Card className={classes.card}>
      <Column>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {data.name}
            </Typography>
            <a href={data.url}>
              <Typography gutterBottom variant="body2" component="p">
                {data.url}
              </Typography></a>
            <Typography variant="body2" color="textSecondary" component="p">
              {data.introduction}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.actions}>
          <Column style={{ width: 'auto', marginLeft: '10px' }}>
            <OriPrice>原价: ￥{data.origin_price}</OriPrice>
            <Price>￥{data.price}</Price>
          </Column>
          <Button size="small" variant="contained" color="secondary">
            购买
        </Button>
          <Button onClick={dial} size="small" variant="contained" color="primary">
            联系卖家
        </Button>
          <Column style={{ width: 'auto', marginLeft: '10px' }}>
            <Typography style={{ fontSize: '12px' }} variant="body2">卖家</Typography>
            {seller && <Typography style={{ color: 'rgb(66,165,245)' }} variant="body2">{seller.username}</Typography>}
          </Column>
        </CardActions>
      </Column>
      <CardMedia
        className={classes.cardMedia}
        component="img"
        alt="Contemplative Reptile"
        image={data.img_url}
        title="Contemplative Reptile"
      />
    </Card>
  );
}

export default ImgMediaCard
