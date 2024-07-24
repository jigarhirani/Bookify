import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

const BookCard = (props) => {
    const fierbase = useFirebase();
    const navigate = useNavigate();

    const [url, setURL] = useState(null);

    useEffect(() => {
        fierbase.getImageURL(props.imageURL).then(url => setURL(url))
    }, []);

    return (
        <Card style={{ width: '18rem', margin: "20px" }}>
            <Card.Img variant="top" src={url} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>This Book has a title {props.name} ans this book is sold by {props.displayName} and this book cost Rs.{props.price}
                </Card.Text>
                <Button onClick={(e) => navigate(props.link)} variant="primary">View Details</Button>
            </Card.Body>
        </Card>
    );
};

export default BookCard;