import { APP_STATE, WebApp } from '../../lib/type_legacy'

const webApp1: WebApp = {
  id: 'hasj387znn6q0sc',
  name: 'My App 1',
  url: 'appTest.zapp.com',
  appState: {
    label: APP_STATE.none,
  },
  data: {
    pages: [
      // {
      //   id: 'uidhn3780zns09np8wy',
      //   name: 'Product',
      // },
      // {
      //   id: '78nwas3ny9pwc',
      //   name: 'Products',
      // },
      // {
      //   id: '9823yn-r8navspdxhl',
      //   name: 'Main',
      // },
      //        And by default you would always have this,
      //        but it will be created in the code.
      //        No need to create it here
      // {
      //   id: '0,', // Always has id: '0'
      //   name: 'Main page',
      // },
    ],
  },
}

const webApp2: WebApp = {
  id: '702y3nr9aesujk',
  name: 'Task Manager',
  url: 'managerTask.zapp.com',
  appState: {
    label: APP_STATE.normal,
  },
  data: {
    pages: [
      {
        id: '0tz7b3goqruykwhjamebvgrsdy9ix',
        name: 'Main',
      },
      {
        id: 'bze2eb6e23bt69z23bt6r780v8tnotki,',
        name: 'Settings',
      },
      {
        id: '9000aceicrw36xkhdjsmb',
        name: 'Create new task',
      },
    ],
  },
}

const webApp3: WebApp = {
  id: '390y8nr[vrg0-[mscdnhudwigcery8o',
  name: 'Calendary',
  url: 'calendary.zapp.com',
  appState: {
    label: APP_STATE.normal,
  },
  data: {
    pages: [
      {
        id: '0b128ilruw3eaj,csr',
        name: 'My calendar',
      },
      {
        id: '-q3cpirnyvi[r0qwnpero',
        name: 'New event',
      },
      {
        id: 'y-iqru3lkjr,bqcpwndljjijkskd',
        name: 'Settings',
      },
      {
        id: 'abt67wiertcf634ikrw7mshfjvghmn,',
        name: 'My friends',
      },
    ],
  },
}

export const mockWebApps: WebApp[] = [
  webApp1,
  webApp2,
  webApp3
]
