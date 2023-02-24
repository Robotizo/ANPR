import React from 'react';
import { render } from '@testing-library/react';
import '../CSS/main.css'
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';


var AWS = require("aws-sdk");
AWS.config.update({
    region: 'ca-central-1'});
var s3 = new AWS.S3();

function refreshPage() {
    window.location.reload(false);
  }

export default class GetImages extends React.Component{
    state = {
        loading: true, 
        images: null
    }


    

 

    async componentDidMount(){
        const response = await s3.listObjectsV2({ Bucket: 'anprlinkbase' }).promise();
        var contents = response.Contents;
        console.log(contents[0]);
        console.log(contents[0].LastModified );
        this.setState({ images: contents, loading: false })
    }


    render(){
        return(
            <div>
                {this.state.loading || !this.state.images ? (
                    <div><CircularProgress /></div>
                ):(   
                    <div>
                        <Grid container spacing={2}>
                        {this.state.images.reverse().map(image =>
                            
                                <Grid item xs={3}>
                                    <img src={ "https://anprlinkbase.s3.ca-central-1.amazonaws.com/" + image.Key } className="image" />
                                    <div>{ image.LastModified.toString() }</div>
                                </Grid>
                            
                    
                        )}

                        </Grid>
                    </div>
                )
                }
            </div>
        )
    }
}
