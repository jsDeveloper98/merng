import { FC } from "react";

import { Dimmer, Loader, Segment } from "semantic-ui-react";

import * as styles from "./Spinner.styles";

interface SpinnerProps {
  text?: string;
}

export const Spinner: FC<SpinnerProps> = ({ text = "Loading" }) => {
  return (
    <styles.Spinner>
      <Segment>
        <Dimmer active>
          <Loader>{text}</Loader>
        </Dimmer>
      </Segment>
    </styles.Spinner>
  );
};
