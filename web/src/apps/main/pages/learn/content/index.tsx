import "./style.scss";

import { Dispatch, StateInterface } from "src/apps/main/redux";
import { FC, useEffect } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

import { Document } from "@dzcode.io/common/dist/types";
import EditIcon from "@material-ui/icons/Edit";
import FacebookIcon from "@material-ui/icons/Facebook";
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import InstagramIcon from "@material-ui/icons/Instagram";
import { LearnPageState } from "src/apps/main/redux/reducers/learn-page";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { Markdown } from "src/apps/main/components/markdown";
import Skeleton from "@material-ui/lab/Skeleton";
import { SpeedDial } from "src/apps/main/components/SpeedDial";
import TwitterIcon from "@material-ui/icons/Twitter";
import Typography from "@material-ui/core/Typography";
import { fetchCurrentDocument } from "src/apps/main/redux/actions/documentation-page";

const actions = [
  { icon: <EditIcon />, name: "Edit This Document" },
  { icon: <FileCopyIcon />, name: "Copy URL" },
  { icon: <FacebookIcon />, name: "Share to Facebook" },
  { icon: <TwitterIcon />, name: "Share to Twitter" },
  { icon: <LinkedInIcon />, name: "Share to LinkedIn" },
  { icon: <InstagramIcon />, name: "Share to Instagram" },
];

const useStyles = makeStyles((theme) =>
  createStyles({
    heroImage: {
      width: "100%",
      maxHeight: "400px",
      objectFit: "cover",
    },
    speedDial: {
      position: "fixed",
      "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      },
      "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
        top: theme.spacing(2),
        left: theme.spacing(2),
      },
    },
    spacing: {
      marginBottom: theme.spacing(6),
    },
  }),
);

export const Content: FC = () => {
  const { currentDocument } = useSelector<StateInterface, LearnPageState>(
    (state) => state.learnPage,
  );
  const dispatch = useDispatch<Dispatch<LearnPageState>>();

  useEffect(() => {
    dispatch(fetchCurrentDocument());
    setTimeout(() => window.FB && window.FB.XFBML.parse(), 3000);
  }, []);

  const classes = useStyles();

  const ContentSkeleton = (
    <>
      <Skeleton variant="rect" width="100%">
        <div style={{ paddingTop: "57%" }} />
      </Skeleton>
      <Typography variant="h3" gutterBottom>
        <Skeleton />
      </Typography>

      {[80, 70, 40, 80, 80, 10].map((width, index) => (
        <Skeleton
          key={`ss-${index}`}
          animation={index % 2 ? "pulse" : "wave"}
          width={`${width}%`}
        />
      ))}
    </>
  );

  return (
    <div>
      {currentDocument ? (
        <div>
          {/* Image */}
          {currentDocument.image && (
            <img
              className={classes.heroImage}
              src={currentDocument.image}
              alt={currentDocument.title}
            />
          )}
          {/* Title */}
          <Typography variant="h4" gutterBottom>
            {currentDocument.title}
          </Typography>
          {/* Description */}
          <Typography variant="caption" display="block" gutterBottom>
            {currentDocument.description}
          </Typography>
          <hr />
          {/* Content */}
          <Markdown>{currentDocument.content + ""}</Markdown>
          {/* Actions */}
          <SpeedDial
            className={classes.speedDial}
            ariaLabel="Actions SpeedDial"
            actions={actions}
            open
          />
          <div className={classes.spacing} />
          {/* Comments */}
          <div
            className="fb-comments"
            data-href={location.origin + location.pathname}
            data-width="100%"
            data-numposts="5"
          />
          <div className={classes.spacing} />
        </div>
      ) : (
        ContentSkeleton
      )}
    </div>
  );
};