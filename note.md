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
//for trace
mockFunction('test')
mockFunction.mockReturnValue('shoud be return this')
console.log(mockFunction)
expect(mockFunction).toBeCalledWith('test')
expect(mockFunction).toBeCalleTimes(1)

#jest 기본 test환경 jsdom -> node
jest.config.js생성
https://jestjs.io/docs/configuration

#unit test 에서 req.body 필요시
req=httpMocks.createRequest()
res=httpMocks.createResponse()

#beforeEach 반복, 각 테스트케이스 전 실행

#

Promise.resolve(value)
Promise.reject(reason)
next: err handle

# 통합테스트

외부 call ret까지
jest 유닛테스트 모듈
supertest 통합테스트 모듈

# express err handle

app.use(function(error,req,res,next){
res.json({message:error.message})
})
단 async는 이렇게도 catch 불가이므로 보낼 때 next 랩핑
app.get('\*',function(req,res,next){setImmediate(()=>{next(new Error('some err'));})})
spp.use(function(error,req,res,next){res.json({message:error.message})})
에러처리 미들웨어는 가장 마지막에
