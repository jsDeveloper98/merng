import { FC } from "react";

import * as styles from "./NotFound.styles";

export const NotFound: FC = () => {
  return (
    <styles.NotFound>
      <h1>This Page Isn't Available</h1>
      <p>
        The link may be broken, or the page may have been removed. Check to see
        if the link you're trying to open is correct.
      </p>
    </styles.NotFound>
  );
};
