type BaseProps = {
  baseProp: {
    prop: any;
  };
};

const getFF = (): boolean => {
  return false;
};

/** Case 1 (Not working) */

let FF1 = getFF();
let FF2 = getFF();

type FF1Props = {
  ff1prop: {
    prop: any;
  };
};

type FF2Props = {
  ff2prop: {
    prop: any;
  };
};

type ReactComponent12Props = BaseProps &
  (typeof FF1 extends true ? FF1Props : {}) &
  (typeof FF2 extends true ? FF2Props : {});

export const MyReactComponent12 = (props: ReactComponent12Props) => {
  props.baseProp.prop;
  props.ff1prop.prop;
  props.ff2prop.prop; // not possible, because FF2 can be false.
  props.ff2prop?.prop; // even using question mark
};

/** Case 2 (Only working as expected if we already checked the value of the FFs) */

const FF3 = true;
const FF4 = false;

type FF3Props = {
  ff3prop: {
    prop: any;
  };
};

type FF4Props = {
  ff4prop: {
    prop: any;
  };
};

type ReactComponent34Props = BaseProps &
  (typeof FF3 extends true ? FF3Props : {}) &
  (typeof FF4 extends true ? FF4Props : {});

export const MyReactComponent34 = (props: ReactComponent34Props) => {
  props.baseProp.prop;
  props.ff3prop.prop;
  props.ff4prop.prop; // not possible, because FF4 is false.
  props.ff4prop?.prop; // even using question mark
};

/** Case 3 (Solving the problem) */

let FF5 = getFF();
let FF6 = getFF();

type FF5Props = {
  ff5prop?: {
    prop: any;
  };
};

type FF6Props = {
  ff6prop?: {
    prop: string;
  };
};

type ReactComponent56Props = BaseProps & FF5Props & FF6Props;

export const MyReactComponent56 = (props: ReactComponent56Props) => {
  props.baseProp.prop;
  props.ff5prop.prop;
  props.ff6prop.prop;
  props.ff6prop?.prop;
};
