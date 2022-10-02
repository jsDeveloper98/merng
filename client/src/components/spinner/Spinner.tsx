import { FC, memo } from "react";

import { Dimmer, Loader, Segment } from "semantic-ui-react";

import * as styles from "./Spinner.styles";

interface SpinnerProps {
  text?: string;
}

const SpinnerComp: FC<SpinnerProps> = ({ text = "Loading" }) => {
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

export const Spinner = memo(SpinnerComp);
