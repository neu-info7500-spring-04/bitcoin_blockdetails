// ** React Imports

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { BitcoinTransactionInterface } from "./BlockTransaction";
import { formatDateTime } from "../helper/utils";

// ** Icons Imports
interface PropsTypes {
  data: BitcoinTransactionInterface;
}
const SingleTranscation = (props: PropsTypes) => {
  return (
    <Card>
      <CardHeader
        title="Transcation Details"
        subheader={
          <Typography variant="body2">
            <Box
              component="span"
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              {props.data.hash}
            </Box>
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: "2rem !important",
            letterSpacing: "0.15px !important",
          },
        }}
      />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 5]}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h6">{"Amount Transacted"}</Typography>
                <Typography variant="body1">
                  {props.data.inputValue + " BTC"}
                </Typography>
                <Typography variant="caption">
                  {props.data.input_value_usd.toFixed(2) + " (USD)"}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h6">{"Fee"}</Typography>
                <Typography variant="body1">
                  {props.data.feeValue + " BTC"}
                </Typography>
                <Typography variant="caption">
                  {props.data.fee_value_usd.toFixed(2) + " (USD)"}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h6">{"Date Time"}</Typography>
                <Typography variant="body1">
                  {formatDateTime(props.data.block.timestamp.time)}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h6">{"Size"}</Typography>
                <Typography variant="body1">
                  {props.data.txSize + " Bytes"}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h6">{"Version"}</Typography>
                <Typography variant="body1">{props.data.txVersion}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h6">{"Weight"}</Typography>
                <Typography variant="body1">{props.data.txWeight}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h6">{"Index"}</Typography>
                <Typography variant="body1">{props.data.index}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h6">{"Size"}</Typography>
                <Typography variant="body1">{props.data.txVsize}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h6">{"Height"}</Typography>
                <Typography variant="body1">{props.data.block.height}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h6">{"Lock Time"}</Typography>
                <Typography variant="body1">{props.data.txLocktime}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h6">{"Output"}</Typography>
                <Typography variant="body1">
                  {props.data.outputValue + " BTC"}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SingleTranscation;
