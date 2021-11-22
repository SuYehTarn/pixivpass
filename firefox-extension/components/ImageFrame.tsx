import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import sanitizeHtml from "sanitize-html";

const ImageFrame = ({ imageUrl, artworkInfo }: { [key: string]: any }) => {
  return (
    <>
      <Card>
        <Card.Img variant="top" src={imageUrl} />
        <Card.Body>
          <Card.Title>{artworkInfo.body.illustTitle ?? ""}</Card.Title>
          <Card.Text>
            {artworkInfo.body.description
              ? sanitizeHtml(artworkInfo.body.description, {
                  allowedTags: [],
                })
              : ""}
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default ImageFrame;
