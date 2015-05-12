// Ajout de commentaire pour test flow git
Ext.define("AmsMain.view.map.Panel", {
    extend: "Ext.panel.Panel",
    requires: [
        'AmsMain.view.map.PanelController',
        'AmsMain.view.map.popup.Window'
    ],
    xtype: 'ams-map',
    controller: "map-panel",
    layout: {
        type: 'fit'
    },
    mapDiv: null,
    map: null,
    mousePosition: [0, 0],
    popupWindow: null,
    initComponent: function () {
       
        var id = Ext.id();
        var me = this;
        this.mapDiv = document.createElement('div');
        this.mapDiv.id = id;
        document.getElementsByTagName('body')[0].appendChild(this.mapDiv);
         this.popupWindow = Ext.create('AmsMain.view.map.popup.Window',{
            hidden:true,
            constrain:true,
            floating: true,        
            draggable:false,
            constrainHeader: true
         });
        
        var view = new ol.View({
            projection: 'EPSG:3857',
            //center: [37.41, 8.82],
            center: ol.proj.transform([37.41, 8.82], 'EPSG:4326', 'EPSG:3857'),
            zoom: 4
        });


        var mousePositionControl = new ol.control.MousePosition({
            coordinateFormat: ol.coordinate.createStringXY(4),
            projection: 'EPSG:4326',
            undefinedHTML: '&nbsp;'
        });
        this.map = new ol.Map({
            target: id,
            layers: [],
            controls: ol.control.defaults().extend([mousePositionControl]),
            // interactions: [],
            view: view

        });
        //map.on(‘mousemove’)
        document.addEventListener('mousemove', function (e) {
            me.mousePosition = [e.clientX || e.pageX, e.clientY || e.pageY];

        }, false);
        this.map.on('pointermove', function (evt) {

            var featureInfos = me.map.forEachFeatureAtPixel(evt.pixel,
                    function (feature, layer) {
                        return {
                            feature: feature,
                            layer: layer
                        };
                    });

            if (featureInfos) {
                var feature = featureInfos.feature;
                var layer = featureInfos.layer;
                var nodeId = layer.get('nodeId');
                var treeStore = Ext.data.StoreManager.lookup('AmsMain.store.Tree');
                var record = treeStore.findRecord('id', nodeId);
                if (record !== null)
                {
                    
                    var jsonParamsString = record.get('jsonParam');
                    if (jsonParamsString !== undefined && jsonParamsString !== null)
                    {
                        var jsonParams = Ext.JSON.decode(jsonParamsString, true);
                        if (jsonParams !== null)
                        {

                            var classInfo = Ext.ClassManager.get(jsonParams.table);
                            if (classInfo !== null)
                            {
                                me.popupWindow.show();
                                var id = feature.getProperties()["id"];
                                me.popupWindow.setInfos(classInfo,id);
                                var geometry = feature.getGeometry();
                                var coord = geometry.getCoordinates();
                               
                                var position = [
                                    me.mousePosition[0]+16,
                                    me.mousePosition[1]+16
                                ];
                                me.popupWindow.setXY(position);
                            }

                        }
                    }

                }




                // console.log(feature.getProperties().id);
            } else {
                me.popupWindow.hide();
            }
        });



        this.map.on('moveend', function (evt) {
            var map = evt.map;
            var extent = map.getView().calculateExtent(map.getSize());
            var bottomLeft = ol.proj.transform(ol.extent.getBottomLeft(extent), 'EPSG:3857', 'EPSG:4326');
            var topRight = ol.proj.transform(ol.extent.getTopRight(extent), 'EPSG:3857', 'EPSG:4326');
            var coords = [topRight[0], topRight[1], bottomLeft[0], bottomLeft[1]];
            var setters = [];
            setters.push({
                schema: 'Sig',
                code: 'User_Extend',
                value: coords.join(",")
            });
            setters.push({
                schema: 'Sig',
                code: 'User_Zoom',
                value: map.getView().getZoom()
            });
            AmsUi.util.Param.setParams(setters, function () {

            });


        });
        this.items = [
            {
                xtype: 'container',
                
                items: [
                    {
                        xtype: 'panel',
                        layout: 'fit',
                        contentEl: id,
                        flex: 1
                    },
                   this.popupWindow
                ]

            }

        ];
        this.callParent(arguments);
    },
    getMap: function ()
    {
        return this.map;
    },
    onDestroy: function () {
        document.getElementsByTagName('body')[0].removeChild(this.mapDiv);
        this.callParent(arguments);

    },
    listeners: {
        resize: function (scope, width, height, oldWidth, oldHeight, eOpts)
        {
            if (this.map !== null)
            {
                this.map.setSize([width, height]);
            }
        }
    }
});
