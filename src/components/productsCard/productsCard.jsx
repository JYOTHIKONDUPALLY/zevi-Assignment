import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Rating } from '@mui/material';
import styles from './productCards.module.css';

export default function ProductCard({ product }) {
  return (
    <>
      <Card key={product.id} className={styles.card}>
          <CardMedia component="img" alt={product.title} image={product.image} style={{ height: '200px', objectFit: 'contain' }}/>

        <CardContent>
          <Typography variant="h6">{product.title}</Typography>
          <Typography variant="body1" paddingY="0.5rem" fontWeight="700">
            Rs {product.price.toFixed(2)}
          </Typography>
          <Rating name="read-only" value={product.rating} precision={0.5} readOnly />
        </CardContent>

        <CardActions className={styles.cardActions}>
          {/* Add actions or buttons if needed */}
        </CardActions>
      </Card>
    </>
  );
}
