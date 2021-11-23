import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

const PIXIV_PASS_API_URL = process.env["NEXT_PUBLIC_PIXIV_PASS_API_URL"];

const SearchBar = ({ setArtworkInfo, setImageUrl }: { [key: string]: any }) => {
  const [artworkId, setArtworkId] = useState("");

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setArtworkId(e.target.value);
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      var response = await fetch(`${PIXIV_PASS_API_URL}/profile/${artworkId}`);
      var info = await response.json();
      setArtworkInfo(info);
      var response = await fetch(`${PIXIV_PASS_API_URL}/image/${artworkId}`);
      var blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setImageUrl(imageUrl);
    } catch (e) {
      console.log("Error");
    }
  };
  return (
    <>
      <InputGroup className="my-2 sticky-top">
        <FormControl
          placeholder="Pixiv Artwork ID"
          aria-label="Pixiv Artwork ID"
          value={artworkId}
          onChange={(e) => {
            handleInputChange(e as React.ChangeEvent<HTMLInputElement>);
          }}
        />
        <Button
          variant="primary"
          id="Submit"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Submit
        </Button>
      </InputGroup>
    </>
  );
};

export default SearchBar;
