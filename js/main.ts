function sum(a: number, b: number): number {
  return a + b;
}

console.log(sum(2, 1));
let data: number | string;
data = 5;
data = 'str';
console.log(data);

type MainInfo = {
  firstName: string;
  Lastname: string;
};
type AdditionalInfo = {
  age: number;
};

type FullInfo = MainInfo | AdditionalInfo; //&
const info0: FullInfo = {
  firstName: '123',
  Lastname: '123',
  age: 20,
};
const info1: FullInfo = {
  firstName: '123',
  Lastname: '123',
};

const info2: FullInfo = {
  age: 2,
};

let value: number & string; //never

type SuperType = {
  name: string;
};
type SubType = {
  name: string;
  age: number;
};
const subType: SubType = { name: 'ULbi', age: 25 };
const superType: SuperType = subType;
let value2 = false;
value2 = true;

let value3: any;
value3 = 5;
value3 = [];
value3 = undefined;
function logData0(data: any) {
  // string ,number...
  console.log(data);
}
function logData1(data: unknown) {
  let value4: string;
  if (typeof data === 'string') {
    value4 = data;
  }
  if (Array.isArray(data)) {
    console.log(data.length); // ✓
  }
}

logData1([1, 2]);

let value1: unknown;
let str: string = 'хай';
value1 = str;
console.log(value1);

//let value90: never;
//let str1: string = value90;

//let str2: string = '123';
//let value7: never = str2;
//function fail(): never {
// throw new Error(); // программа остановилась
//}

///let str1: string = fail();

enum Values {
  FIRST,
  SECOND,
  THIRD,
}
function FN(values: Values) {
  switch (values) {
    case Values.FIRST:
      return 1;
    case Values.SECOND:
      return 2;
    case Values.THIRD:
      return 3;
    default:
      const exhastiveCheck: never = values;
      return values;
  }
}
FN(Values.FIRST);
function fn2() {
  console.log();
}
fn2();

let numbers: number[] = [1, 2, 34];

type Item = {
  id: string;
  name: string;
  price?: number;
};
const items: Item[] = [];

items.push({
  id: '1',
  name: 'AK-74',
  price: 123,
});

interface User {
  id: string;
  name: string;
  isMail: boolean;
  items: Item;
}

const user: User[] = [];
user.push({
  id: '434',
  name: 'Goh',
  isMail: false,
  items: {
    id: '9',
    name: 'AK-74',
  },
});

console.log(user);

type ComponentProps = {
  className: string;
  color: 'red' | 'green';
};
type onClick = () => void;

let status: 'loading' | 'success' | 'idle' = 'idle';
status = 'loading';
if (status === 'loading') {
  console.log(status);
}

type Color = 'red' | 'green' | 'blue';
const color = 'green';
const values = {
  color: 'green',
} as const;
function paint(color: Color) {
  if (color === 'blue') return console.log(color);
  if (color === 'green') return console.log(color);
  if (color === 'red') return console.log(color);
  const exhastiveCheck: never = color;
}
paint(color);
paint(values.color);

interface User2 {
  readonly id: string;
}

type EventName = 'click' | 'change';

type EventHandler = `on${EventName}`;

type Deraction = 'top' | 'right' | 'bottom' | 'left';

type Margin = `margin-${Deraction}`;

let style: Margin = 'margin-left';
type Userid = `user_id_${number}`;

const user1: Userid = 'user_id_9';
console.log(user1);

const arr: string[] = ['l', 'o', 'p'];

function getFristString(arr: string[]): string | undefined {
  return arr[0];
}
function getFris<T>(arr: T[]): T | undefined {
  return arr[0];
}
console.log(getFristString(arr));
console.log(getFris<string>(arr));

type Item2 = { id: string; name: string; price: number };

function getNames<T extends { name: string }>(arr: T[]): string[] {
  return arr.map((item) => item.name);
}
const itemsCase: Item2[] = [
  {
    id: '69b546b20b8f0e0cf5719f23',
    name: 'Меч',
    price: 123,
  },
];
const names = getNames(itemsCase);
console.log(names);

type ReuquestStatus = 'idle' | 'loading' | 'success' | 'error';

type CaseItems = {
  _id: string;
  name: string;
  color: string;
  price: number;
};

type ReuquestState = {
  status: ReuquestStatus;
  error: string | null;
};

type CaseState = {
  getItemsRuletStatus: ReuquestState;
  getItemsRuletStatus2: ReuquestState;
  caseItems: CaseItems[];
};

const initialState: CaseState = {
  getItemsRuletStatus: {
    status: 'idle',
    error: null,
  },
  getItemsRuletStatus2: {
    status: 'idle',
    error: null,
  },
  caseItems: [],
};
interface CaseItemsTeplo {
  _id: string;
  name: string;
  color: string;
  price: number;
}
interface MetaData {}

interface User23 {
  userName: string;
}
interface ApiResponse<Data, MetaData> {
  status?: ReuquestStatus;
  meta?: MetaData;
  requestId?: string;
  data: Data;
}

const response: ApiResponse<User23, string> = {
  data: {
    userName: '2342',
  },
};

interface CaseData {
  name: string;
  price: number;
}

interface ApiresponseCase<Data> {
  data: Data;
}
const useResponse: ApiresponseCase<CaseData> = {
  data: { name: 'Poma', price: 123 },
};

interface Tree<T> {
  id: string;
  value: T;
  children: Tree<T>[] | null;
}

const treeNode: Tree<User23> = {
  id: '1',
  value: {
    userName: '3',
  },
  children: [
    {
      id: '2',
      value: {
        userName: '3',
      },
      children: null,
    },
  ],
};

function gen<T>(arg: T) {}
const arrowGen = <T>(arg: T): T => {
  return arg;
};

console.log(arrowGen(1));
const data2 = arrowGen<User23>({ userName: '3' });

function createEnity<T extends { id: string }>(arg: T[]): string[] {
  return arg.map((item) => item.id);
}

interface User22 {
  userName: string;
  id: string;
}

console.log(createEnity(treeNode.children ?? []));
console.log();
let data23: User22[] = [
  {
    userName: 'PLK',
    id: '32',
  },
  {
    userName: 'PLK',
    id: '3fg',
  },
];
let data24: User22 = {
  userName: 'PLK',
  id: '32',
};

function createEnity2<T extends { id: string }>(arg: T) {
  return arg;
}
function createEnity3<T extends { id: string }>(arg: T[]) {
  return arg.map((item) => item.id);
}
let data25: CaseData[] = [
  {
    name: 'p',
    price: 23,
  },
];
console.log(createEnity3<User22>(data23));
createEnity2<User22>({ id: 'D', userName: 'D' });

type isArray2<T> = T extends any[] ? true : false;
const first: isArray2<string> = false;
const first2: isArray2<string[]> = true;

type ApiName<T> = T extends any[] ? { name: T; price: string } : { data: T };

const cases: ApiName<CaseData[]> = {
  name: [{ name: 'кЕЙС', price: 100 }],
  price: '323',
};
const cases2: ApiName<CaseData> = {
  data: { name: 'кеЙСЫ', price: 22 },
};

function printValue(value: string | number) {
  if (typeof value === 'string') {
    return console.log(value.toUpperCase());
  } else if (typeof value === 'number') {
  }
  return value;
}

printValue('d');

function narrw(arg: string | number | null, arg2: number) {
  if (arg === null) {
    arg;
  }
  if (arg === arg2) {
    arg;
  }
  return arg;
}

interface User82 {
  username: string;
  age: number;
}
interface Person {
  lastname: string;
  firstname: string;
  age: number;
}
function narrowing(arg: User82 | Person) {
  if ('username' in arg) {
    arg;
  }
  if ('lastname' in arg) {
    arg;
  }
  return arg;
}

const data45: Person = {
  lastname: 'kOL',
  firstname: 'vOLDING',
  age: 334,
};

console.log(narrowing(data45));

interface BaseCar {
  maxSpeed: number;
  weight: number;
}

interface Bmw extends BaseCar {
  type: 'bmw';
  bmwField: string;
}

interface Audi extends BaseCar {
  type: 'audi';
  audiField: string;
}
type Car = Audi | Bmw;

function name(params: Bmw | Audi) {
  switch (params.type) {
    case 'bmw':
      return params.bmwField;

    case 'audi':
      return params.audiField;

    default:
      params;
  }
}

const myBmw: Bmw = {
  type: 'bmw',
  bmwField: 'что-то',
  maxSpeed: 250,
  weight: 1500,
};

console.log(name(myBmw));

interface Car2 {
  maxSpeed: number;
  width: number;
}

interface Person2 {
  age: number;
  name: string;
}

const person: Person2 = {
  age: 23,
  name: 'FOg',
};
function isCar(arg: Car2 | Person2): arg is Car2 {
  return 'maxSpeed' in arg && 'width' in arg;
}
function isPerson(arg: Car2 | Person2): arg is Person2 {
  return 'maxSpeed' in arg && 'width' in arg;
}
console.log(isPerson(person));

function fn(data: Car2 | Person): data is Car2 {
  return 'maxSpeed' in data;
}

function getUser() {
  return { name: 'Alex', age: 25 };
}

type UserOfType = ReturnType<typeof getUser>;

interface Person90 {
  age: number;
  userName: string;
  password: string;
}

const obj = {
  age: 25,
  userName: 'h',
  fddfd: 'fgf', //??
  password: 'df',
} as Person90;

const strw = 'gf3' as unknown as number;

//console.log(strw.toFixed(2));

const obj3 = {
  age: 25,
  userName: 'h',
  password: 'df',
} satisfies Person90;

function JSONParse<T>(data: string): T {
  return JSON.parse(data) as T;
}

const parsedJso2 = '{"age":23}';
console.log(JSONParse<Person90>(parsedJso2));
//const parsedJson = JSON.parse('{age:23}');

//async function fetch () {
//  const data = await fetch('')
//  const personData = await data.json()
//}

//const password = watch('password');
//const username = watch('username');

interface User78 {
  username: string;
  password: string;
}
//const saved = localStorage.getItem('useFormsLogin');
//const savedData: User78 | null = saved ? JSON.parse(saved) : null;

const PersonKeys = {
  age: 'age',
  username: 'username',
} as const;

const keys = Object.keys(obj);

function keys2<T extends object>(data: T): Array<keyof T> {
  return Object.keys(data) as Array<keyof T>;
}

const k = keys2(obj);
console.log(k);

type Person45 = typeof person;
const perso3n: Person45 = {
  age: 3,
  name: 'f',
};

function getData(user: Person): number {
  return 5;
}

type GetDataFn = typeof getData;

//ReturnType<typeof store.getState>
type PersonKey = keyof typeof obj;
function getBykey<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

type Form = {
  email: string;
  password: string;
};
const form: Form = {
  email: 'FVB@9RU',
  password: 'DFGFD34543',
};
function updateField<T, K extends keyof T>(obj: T, key: K, value: T[K]): T[K] {
  return (obj[key] = value);
}
console.log(updateField(form, 'email', 'vf@mail.ru'));
console.log(form);
console.log(getBykey(obj, 'age'), 'Возраст');

interface Person9 {
  name: string;
  addres?: {
    street: string;
  };
  getAge?: () => number;
}

function prepareUser(user: Person9) {
  console.log(user.addres?.street);
  console.log(user.addres!.street);
  console.log(user.getAge?.());
}

prepareUser({ name: '123', addres: { street: 'foling 1/2' } });

const color2 = {
  RED: 'red',
  GREEN: 'green',
  BLUE: 'blue',
};
background: color2.RED;
enum Color2 {
  RED = 'red',
  GREEN = 'green',
  BLUE = 'blue',
}
function setColor(color: Color2) {}

setColor(Color2.GREEN);

const Status = {
  SUCCESS: 'success',
  ERROR: 'error',
  LOADING: 'loading',
} as const;

type StatusType = (typeof Status)[keyof typeof Status];

const statuss: StatusType = 'loading';

type Literal = 'success' | 'loading';
type id = number[];

interface Base {
  username: string;
  age: number;
}

interface Userr extends Base {
  password: string;
}
type Userr45 = Base & {
  password: string;
};

type Type = [number, string, 5];

const tupple: Type = [5, 'f', 5];

type Fn = (arg: number) => void;

const fun: Fn = (arg) => {
  console.log(arg);
};
fun(3);

type Case = {
  caseName: string;
  price: number;
};
type Optinal<T> = {
  readonly [K in keyof T]?: T[K] | null;
};
type MappedTypesKeyNumber<T> = {
  [K in number]: T;
};
type ToString<T> = {
  [K in keyof T]: string;
};
type CaseItems2String = ToString<Case>;

type CaseDateNum = MappedTypesKeyNumber<string>;
const CaseNum: CaseDateNum = {
  0: 'case1',
};
type CaseOptional = Optinal<Case>;

const STATUS2 = {
  IDLE: 'idle',
  LOADING: 'loading',
  ERROR: 'error',
} as const;
type Status = (typeof STATUS2)[keyof typeof STATUS2];

interface User664 {
  userName: string;
  mail: string;
  type: string;
}

type WithoutType<T> = {
  [K in keyof T as Exclude<K, 'type'>]: T[K];
};
const Without: WithoutType<User664> = {
  userName: 'w',
  mail: 'dfg@.ru',
};

type NewUser = Pick<User664, 'userName' | 'type'>;
type OldUser = Omit<User664, 'mail'>;

function getUser2() {
  return { name: 'Alex' };
}

type UserE4 = ReturnType<typeof getUser2>;

type Color23 = 'red' | 'green' | 'blue';

type NarrowColor = Exclude<Color23, 'blue'>;
type NarrowColor2 = Extract<Color23, 'blue'>;

const colorsArray: Record<Color23, string[]> = {
  blue: ['3', '3'],
  red: ['3'],
  green: ['3'],
};
function log(obj: Case | UserE4) {
  if ('name' in obj) {
    console.log(obj.name);
  } else {
    console.log(obj.caseName);
  }
}

function format(value: string): string;
function format(value: number): number;

function format(value: string | number) {
  if (typeof value == 'string') {
    return value.toUpperCase();
  }
  return value * 2;
}
function format2(value: string): number;
function format2<T>(value: T[]): number;

function format2<T>(value: string | T[]) {
  if (typeof value === 'string') {
    return value.length;
  }
  return value.length;
}

console.log(format2(['4343433', 4343434, 434343434, '43']));

function fn32(arg: string, arg1: number): string {
  return '';
}

type MyParameters<T> = T extends (...arg: infer U) => any ? U : never;
type x = MyParameters<typeof fn32>;

const test3: x[] = [
  ['hello', 123],
  ['hello2', 123],
];
