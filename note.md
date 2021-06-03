TDD for node js

#장점
디버깅 시간 단축, 재설계 용이

#env install

npm install express mongoose --save
npm install jest supertest node-mocks-http --save-dev

#about mongo
rdbms:tables, rouws,columns
mongo:collections,documents,fields

schema? 문서의 구조, 기본값 default:0, 유효성 검사 reauired:true

Unit test should be isolated.
종속된 클래스의 신속한 오류 검출 가능

#jest
{filename}.test.js
{filename}.spec.js
tests/

#jest format
describe 그룹화블록
test(it) 개별테스트
test(it)
expect... matcher

#mock
const mockFunction=jest.fn()
mockFunction('test')
mockFunction.mockReturnValue('shoud be return this')
console.log(mockFunction)
expect(mockFunction).toBeCalledWith('test')
expect(mockFunction).toBeCalleTimes(1)
