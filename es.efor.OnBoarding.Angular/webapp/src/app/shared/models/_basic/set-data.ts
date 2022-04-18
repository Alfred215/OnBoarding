export class SetData<TExtendedClass = any> {
    /**
     * Sets the specified properties for this instance, using a partial object.
     * Only set properties will be applied (you may use `null` value. `undefined` will may be ignored).
     * 
     * When SetData is extended, if the class uses an instanced class as a property, this `setData` should be extended
     * to call for the class' constructor. Otherwise, methods will not be initialized.
     * 
     * @param newData The partial object to extend. A full instance may be used.
     * 
     * @example
     ```typescript
     export class MySpecialClass extends SetData {
        myPropertyString = 'some-data'
        myPropertyClass = new MySubclass();

        setData(newData: Partial<this>) {
            // myPropertyString will be automatically set by the super method.
            // myPropertyClass must be propertly instanced and properties assigned.
            if (newData == null) { newData = {}; }
            if (newData.myPropertyClass) {
                // tip: MySubclass could extend SetData aswell to ease this work.
                const mpcPlaceholder = new MySubclass()
                    .setData(newData.myPropertyClass);
                this.myPropertyClass = mpcPlaceholder;
                
                // Super important to call delete. Otherwise, super will assign the data again, without a class instance
                delete newData.myPropertyClass;
            }
            return super.setData(newData);
        }
     }
     ```
     */
    setData(newData: Partial<TExtendedClass>) {
        if (newData == null) { newData = {}; }
        if (typeof (newData) !== 'object') { throw Error(`[${typeof (newData)}] is not a valid SetData object.`); }

        for (const k of Object.keys(newData)) {
            try {
                if (this[k] !== newData[k]) {
                    this[k] = newData[k];
                }
            } catch (e) {
                // Getters cannot be set. Skip.
                if (e instanceof TypeError && e.message != null && e.message.endsWith('which has only a getter')) {
                    return;
                }
                console.error(e);
            }
        }
        return this;
    }
}
