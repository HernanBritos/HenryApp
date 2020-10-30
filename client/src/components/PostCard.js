import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useQuery } from "@apollo/client";
import { USER_FULL } from "apollo/querys/users";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vh",
    margin: "1rem auto",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  content: {
    textTransform: "capitalize",
  },
}));

export default function PostCard({ id, tittle, content, userId }) {
  const history = useHistory();

  const classes = useStyles();
  const { data: preData } = useQuery(USER_FULL, { variables: { id: userId } });

  const user = useMemo(() => {
    if (preData) {
      return preData.users[0];
    }
  }, [preData]);

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.content}
        avatar={
          <Avatar
            onClick={() => history.push(`/profile/${user.id}`)}
            aria-label="recipe"
            className={classes.avatar}
          >
            {user && user.photoUrl ? (
              <img
                src={user && user.photoUrl && user.photoUrl}
                style={{ width: "100%", borderRadius: "50%" }}
                alt={tittle}
              />
            ) : (
              <h5>
                {" "}
                {user &&
                  user.givenName[0].toUpperCase() +
                    " " +
                    user.familyName[0].toUpperCase()}{" "}
              </h5>
            )}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={user && user.givenName + " " + user.familyName}
        subheader={tittle}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
}
