/*
 * Copyright (c) 2011 Imaginea Technologies Private Ltd.
 * Hyderabad, India
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following condition
 * is met:
 *
 *     + Neither the name of Imaginea, nor the
 *       names of its contributors may be used to endorse or promote
 *       products derived from this software.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE REGENTS OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
YUI.add('dialog-box', function (Y) {
    Y.namespace('com.imaginea.mongoV');
    var MV = Y.com.imaginea.mongoV;
    MV.getDialog = function Dialog(form, successHandler, failureHandler) {
        YAHOO.util.Dom.removeClass(form, "yui-pe-content");
        var handleCancel = function () {
                this.cancel();
            };
        var addColDialoghandleSubmit = function () {
                Y.log("Submit handler for add collection called","info");
                var newCollInfo = this.getData();
                if (newCollInfo.name === "") {
                    MV.showAlertDialog("Please enter the name.");
                } else {
                    Y.one("#newName").set("value", newCollInfo.name);
                    Y.one("#" + form + " .bd form").setAttribute("action", MV.URLMap.insertColl());
                    this.submit();
                }
            };
        var addDBDialoghandleSubmit = function () {
                var newDBInfo = this.getData();
                if (newDBInfo.name === "") {
                    MV.showAlertDialog("Please enter the name.");
                } else {
                    Y.one("#newName").set("value", newDBInfo.name);
                    Y.one("#" + form + " .bd form").setAttribute("action", MV.URLMap.insertDB());
                    this.submit();
                }
            };
        var addDocDialoghandleSubmit = function () {
                var newDoc = this.getData().document;
                try {
                    Y.JSON.parse(newDoc);
                    Y.one("#" + form + " .bd form").setAttribute("action", MV.URLMap.insertDoc());
                    this.submit();
                } catch (e) {
                    MV.showAlertDialog("Please enter the new document in JSON format", MV.warnIcon);
                    Y.log("New Document format not JSON", "error");
                }
            };
        var sumbitHandlerMap = {
            "addColDialogSubmitHandler": addColDialoghandleSubmit,
            "addDBDialogSubmitHandler": addDBDialoghandleSubmit,
            "addDocDialogSubmitHandler": addDocDialoghandleSubmit
        };
        var dialogBox = new YAHOO.widget.Dialog(form, {
            width: "30em",
            fixedcenter: true,
            visible: false,
            effect: {
                effect: YAHOO.widget.ContainerEffect.SLIDE,
                duration: 0.25
            },
            constraintoviewport: true,
            buttons: [{
                text: "Submit",
                handler: sumbitHandlerMap[form + "SubmitHandler"] ||
                function () {
                    this.submit();
                },
                isDefault: true
            }, {
                text: "Cancel",
                handler: handleCancel
            }]
        });
        dialogBox.callback = {
            success: successHandler,
            failure: failureHandler
        };
        dialogBox.render();
        dialogBox.show();
        return dialogBox;
    };
}, '3.3.0', {
    requires: ["utility", "node", "alert-dialog"]
});