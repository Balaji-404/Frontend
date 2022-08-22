import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { FormGroup, FormControlLabel, Checkbox, TextField, Button, Tabs, Tab } from '@mui/material';
import FormControl from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Toaster } from "react-hot-toast";
import icon1 from "./icon1.png"
import icon2 from "./icon2.png"

function LinkTab(props) {
	console.log(props);
	return (
		<Tab
			component="a"
			onClick={(event) => {
				// event.preventDefault();
			}}
			{...props}
		/>
	);
}

function Landing() {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<Box>
			<Box style={{ justifyContent: "space-between", display: "flex", padding: "1.53rem" }}>
				<Box style={{ width: "3rem", paddingleft: "5rem" }}>
					<img src={icon1} width="150" height="80" />
				</Box>
				<Box >
					<Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
						<LinkTab label="Home"> <a href="/">Home</a></LinkTab>
						<LinkTab label="About"> <a href="/">About</a></LinkTab>
						<LinkTab label="FAQ's" href="faqs"> <a href="/faqs">FAQ's</a></LinkTab>
					</Tabs>
				</Box>
			</Box>
			<Box style={{display:"flex", paddingLeft:"10rem"}}>
				<Box style={{padding: "5rem", paddingTop: "10rem" , }}>
					<Box>
						<Typography variant="h1">Find the job of </Typography>
						<Typography style={{ display: "flex" }} variant="h1">your <Typography variant="h1" style={{ color: "#089CFF", paddingLeft: "5px" }}>Dreams</Typography> </Typography>
						<Typography style={{ width: "25rem" }} variant="h6">
							Find You New Job Today! New Job Postings Everyday just for you, browse the job you want and apply wherever you want
						</Typography>
					</Box>
					<Box style={{ marginTop: "3rem" }}>
						<Typography>Sign in as</Typography>
						<Box style={{ width: "15rem", display: "flex", justifyContent: "space-between" }}>
							<Box>
								<Button variant="contained">Faculty</Button>
							</Box>
							<Box>
								<Button variant="contained">College</Button>
							</Box>
						</Box>
					</Box>
				</Box>
			 	<Box >
				 <Box style={{width:"30rem", height:"30rem", borderRadius:"10000rem", background:"#089CFF", position:"absolute", right:"20rem", top:"15rem", zIndex:"1"}}></Box>
					<img src={icon2} width="800" height="700"  style={{ position:"absolute", right:"20rem", top:"10rem", zIndex:"2"}} />
				</Box>
			</Box>
		</Box>
	);
}

export default Landing;
