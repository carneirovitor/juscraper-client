
import { Skeleton, Divider } from 'antd';
import React, { Component } from 'react';
import RelatedPartsInfo from '../related-parts-info/RelatedPartsInfo';
import './LawsuitInfo.scss';
import { Row, Col } from 'antd';

class LawsuitInfo extends Component {
    render() {
        if (this.props.loading) {
            return (
                <Skeleton className="LawsuitInfo" active paragraph={{ rows: 20 }}/>
            )
        } else if (!this.props.lawsuit) {
            return null
        } else  {
            return (
                
                <div className="LawsuitInfo">
                    
                    {this.props.lawsuit.map((lawsuit, index)=>{
                    return lawsuit.lsHeader.map((lsheader,i)=> 
                    <div>
                    <h1 key={index}>{lsheader.lsnumber}</h1>
                    <span key={i}>{lsheader.lsresume}</span>
                    
                    </div>
                    )               
                    })}
                    <row></row>
                    <Row>
                        <Col span={17}>
                            {this.props.lawsuit.map((lawsuit, index)=>{
                                    return lawsuit.lsTimeline.map((lstimeline,i)=>
                                        <div key={index} className="column"><br /><row>
                                            <h4 key={i}>{lstimeline.lsdate}</h4>
                                            {lstimeline.lsact.map((lsact,j) => {
                                                return(
                                                    <div>
                                                    <p key={j}>{lsact}</p>
                                                    </div>
                                                    )
                                                })}
                                                </row>
                                        </div>
                                        )               
                                    })}
                        </Col>
                        <Col span={1}></Col>
                        <Col span={6}>
                         {/*}   <h3 className="lawsuit-subtitle">Detalhes do lawsuito</h3>

                            <div className="lawsuit-detail">
                                <p>Classe: {this.props.lawsuit.kind}</p>
                                <p>Área: {this.props.lawsuit.area}</p>
                                <p>Assunto: {this.props.lawsuit.subject}</p>
                                <p>Juíz: {this.props.lawsuit.judge}</p>
                                <p>Valor da ação: R${this.props.lawsuit.action_value}</p>
                            </div>
                            <Divider />
                                <RelatedPartsInfo parts={this.props.lawsuit.related_parts} />*/}
                        </Col>
                    </Row>
                </div>
            )
        }
    }
}

export default LawsuitInfo