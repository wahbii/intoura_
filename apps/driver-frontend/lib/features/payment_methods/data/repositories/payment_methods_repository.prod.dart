import 'package:dartz/dartz.dart';
import 'package:driver_flutter/core/entities/payment_gateway.prod.dart';
import 'package:driver_flutter/core/entities/saved_payment_method.prod.dart';
import 'package:driver_flutter/core/error/failure.dart';
import 'package:driver_flutter/core/graphql/documents/wallet.graphql.dart';
import 'package:flutter_common/core/entities/payment_gateway.dart';
import 'package:flutter_common/core/entities/saved_payment_method.dart';
import 'package:graphql/client.dart';
import 'package:injectable/injectable.dart';

import '../../../../core/datasources/graphql_datasource.dart';
import '../../domain/repositories/payment_methods_repository.dart';

@prod
@LazySingleton(as: PaymentMethodsRepository)
class PaymentMethodsRepositoryImpl implements PaymentMethodsRepository {
  final GraphqlDatasource graphQLDatasource;

  PaymentMethodsRepositoryImpl(
    this.graphQLDatasource,
  );

  @override
  Future<Either<Failure, (List<SavedPaymentMethodEntity>, List<PaymentGatewayEntity>)>> getSavedPaymentMethods() async {
    final result = await graphQLDatasource.query(
      Options$Query$SavedPaymentMethods(fetchPolicy: FetchPolicy.noCache),
    );
    return result.map(
      (r) => (
        r.savedPaymentMethods.toEntity,
        r.paymentGateways.toEntity,
      ),
    );
  }

  @override
  Future<Either<Failure, String>> getExternalUrl({required String paymentGatewayId}) async {
    final result = await graphQLDatasource.mutate(
      Options$Mutation$GetSetupPaymentMethodLink(
        variables: Variables$Mutation$GetSetupPaymentMethodLink(
          gatewayId: paymentGatewayId,
        ),
      ),
    );
    return result.map(
      (r) => r.setupPaymentMethod.url!,
    );
  }
}
