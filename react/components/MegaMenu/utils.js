export const orderElements = (elements) => {
    const noChildren = elements.filter(el => !el.hasChildren);
    const hasChildren = elements.filter(el => el.hasChildren);
    return [].concat(noChildren, hasChildren);    
}

export const inlineOptions = (elements, order=true) => {
    const lineArray = [];

    const orderArray = order ? orderElements(elements) : elements;
    let currentColumn = 0;
    orderArray.forEach(element => {              
        if(element.column){
            currentColumn = element.column;
        }  

        element.level = 1;
        element.column = currentColumn;
        lineArray.push(element);            
        if(element.hasChildren && element.hasChildren==true){
            const level2Children = orderElements(element.children);
            level2Children.forEach(el => {

                el.level=2;
                el.column = currentColumn;
                lineArray.push(el)                        
                if(el.hasChildren && el.hasChildren == true){                            
                    const level3Children = orderElements(el.children);
                    level3Children.forEach(ultimo => {
                        ultimo.level=3;
                        ultimo.column = currentColumn;
                        lineArray.push(ultimo);                                
                    });                            
                }
            });
        }
    });

    return lineArray;
}