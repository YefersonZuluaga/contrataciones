describe('Prueba <DemoComponent />', () => {
  test('Esta prueba no debe de fallar', () => {
    const message1 = 'Hola Mundo';

    const message2 = message1.trim();

    // console.log(message13)
    expect(message1).toBe(message2);
  })
})

// describe("prueba-funciones" , ()=>{
//   test("prueba 1" , ()=>{

//   })
// })