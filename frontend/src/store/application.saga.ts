import { all, fork, Effect } from "redux-saga/effects";

import { versionInfo } from "root/utils/version";
import userSaga from "./user/saga";

export default function* rootSaga(): Generator<Effect, void, void> {
  console.info(versionInfo());
  yield all([fork(userSaga)]);
}
