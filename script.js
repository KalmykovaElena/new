// // function appendNewScript(){
// //     const script = document.createElement('script')
// //     script.src='./newScript.js'
// //     console.log('append newScript')
// //     document.body.prepend(script)
// // }
// // appendNewScript()
// // // printScriptName()
// //
// // document.addEventListener('DOMContentLoaded',()=>{
// //     console.log('DOMContentLoaded')
// // })
// // // async deffer атрибуты не блокируют дальнейшую загрузку страницы
// //
// // window.addEventListener('load',()=>{
// //     printScriptName()
// // })
// // ______________________________________________________________________
// function appendNewScriptWithCallBack(callBack){
//     const script = document.createElement('script')
//     script.src='./newScript.js'
//     script.onload=()=>{
//         console.log('./newScript.js загрузился')
//         callBack()
//     }
//     document.body.prepend(script)
//
// }
// function customCallBack(){
//     console.log('запустился customCallBack')
//     printScriptName()
// }
// appendNewScriptWithCallBack(customCallBack)
// // _______________________________________________________________________________
//
// function appendNewScriptWithCallBack(srsPath,callBack){
//     const script = document.createElement('script')
//     script.src=srsPath
//     script.onload=()=>{
//         console.log('Документ загрузился')
//         callBack()
//     }
//     document.body.prepend(script)
//
// }
// function customCallBack(){
//     console.log('запустился customCallBack')
//     printScriptName()
// }
// appendNewScriptWithCallBack('./newScript.js',function(){
//     printScriptName()
// })
// appendNewScriptWithCallBack('./secondNewScript.js',function(){
//     printSecondScriptName()
// })
//
// // __________________________________________
// // ONERROR
// // ___________________________________________
// function appendNewScriptWithCallBack(srsPath,callBack){
//     const script = document.createElement('script')
//     script.src=srsPath
//     script.onload=()=>{
//         console.log('Документ загрузился')
//         callBack()
//     }
//
//     script.onerror=()=>{
//         callBack(new Error('скрипт налажал'))
//     }
//     document.body.prepend(script)
//
// }
// appendNewScriptWithCallBack('./newScript.js',function(error){
//     if(error) {
//         console.log(error)
//     }
// else
//     {
//         printScriptName()
//         appendNewScriptWithCallBack('./secondNewScript.js',function(error){
//
//         }
//         if(error) {
//         console.log(error)
//     }
//     else{
//
//     }
//     }
// })
// ____________________________________________________________________________

const promise = new Promise((resolve,reject)=>{   //44
    console.log('Promise запустился сразу')
    setTimeout(()=>{
        console.log('Зашли в setTimeout')
        resolve('Ответ')
    },1000)
    console.log('log после resolve')// выполнится вторым
})
let result=promise.then((result)=>{
    console.log('Первый then',result)
   return  result.toUpperCase()
}).then((result2)=>{
    console.log('Второй then',result2)
    return+'Добавить еще строку'
}).catch((error)=>{
    console.log('catch error',error)
    return 2
}).then((result3)=>{
    console.log('Третий then',result3)
    return result3
})
    .finally(()=>{
    console.log('finally')
})
console.log(result)//66

//________________________________________________________________________

class OurPromise{
    constructor(executor) {
        this.lineHandlers=[]
        this.errorHandler=()=>{}
        this.finallyHandler=()=>{}
      try  {
            executor(this.resolve.bind(this), this.reject.bind(this))
        } catch(e){
            this.errorHandler(e)
      }
    }
    resolve(data){
        this.lineHandlers.forEach(callBack=>{
            data=callBack(data)
        })
    }
    // resolve и reject ожидают один аргумент или ни одного
    reject(error){
this.errorHandler(error)
        this.finallyHandler()
    }
    then(callBack){
//необх для чейнинга
this.lineHandlers.push(callBack)
        //возвращает объект, который содержит все методы инстанса класса
        return this
    }

    //  цепочка промисов подходит для перехвата ошибокю Если промис завершается с ошибкой, то управление переходит в ближайший обработчик ошибок - catch
    catch(fn){
        this.errorHandler(fn)
        return this
    }
    finally(fn){
this.finallyHandler(fn)
        return this
    }
}

//____________________________
async function asyncFoo(){
    let result= await promise
        .then((result)=>{
        console.log('Первый then',result)
        return  result.toUpperCase()
    }).then((result2)=>{
        console.log('Второй then',result2)
        return+'Добавить еще строку'
    }).catch((error)=>{
        console.log('catch error',error)
        return 2
    }).then((result3)=>{
        console.log('Третий then',result3)
        return result3
    })
        .finally(()=>{
            console.log('finally')
        })
}
asyncFoo()